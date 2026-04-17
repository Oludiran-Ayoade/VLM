"use client";

import { useCallback, useState } from "react";
import type { Timeframe, UploadedImage } from "@/types/analysis";
import {
  validateImageFile,
  fileToBase64,
  createPreviewUrl,
  revokePreviewUrl,
} from "@/lib/image-utils";
import { useAnalyzerStore } from "@/store/analyzerStore";

interface UseImageUploadReturn {
  uploadImage: (file: File) => Promise<void>;
  removeImage: () => void;
  error: string | null;
  isUploading: boolean;
}

export function useImageUpload(timeframe: Timeframe): UseImageUploadReturn {
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const setImage = useAnalyzerStore((s) => s.setImage);
  const currentImage = useAnalyzerStore((s) => s.images[timeframe]);

  const uploadImage = useCallback(
    async (file: File) => {
      setError(null);
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setError(validation.error!);
        return;
      }

      setIsUploading(true);
      try {
        const base64 = await fileToBase64(file);
        const preview = createPreviewUrl(file);

        // Revoke old preview URL if exists
        if (currentImage?.preview) {
          revokePreviewUrl(currentImage.preview);
        }

        const uploaded: UploadedImage = {
          file,
          preview,
          base64,
          timeframe,
        };
        setImage(timeframe, uploaded);
      } catch {
        setError("Failed to process image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    },
    [timeframe, setImage, currentImage?.preview]
  );

  const removeImage = useCallback(() => {
    if (currentImage?.preview) {
      revokePreviewUrl(currentImage.preview);
    }
    setImage(timeframe, null);
    setError(null);
  }, [timeframe, setImage, currentImage?.preview]);

  return { uploadImage, removeImage, error, isUploading };
}
