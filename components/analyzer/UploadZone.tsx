"use client";

import { useCallback, useRef, useState } from "react";
import type { TimeframeConfig } from "@/types/analysis";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useAnalyzerStore } from "@/store/analyzerStore";

interface UploadZoneProps {
  config: TimeframeConfig;
}

export function UploadZone({ config }: UploadZoneProps) {
  const { uploadImage, removeImage, error, isUploading } = useImageUpload(
    config.id
  );
  const image = useAnalyzerStore((s) => s.images[config.id]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) uploadImage(file);
    },
    [uploadImage]
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) uploadImage(file);
      if (inputRef.current) inputRef.current.value = "";
    },
    [uploadImage]
  );

  if (image) {
    return (
      <div className="relative group">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden backdrop-blur-sm">
          <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className="text-lg">{config.icon}</span>
              <div>
                <span className="text-sm font-medium text-white">
                  {config.label}
                </span>
                <span className="text-xs text-white/40 ml-2">
                  {config.description}
                </span>
              </div>
            </div>
            <button
              onClick={removeImage}
              className="text-xs text-white/40 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
            >
              Remove
            </button>
          </div>
          <div className="relative aspect-video bg-black/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.preview}
              alt={`${config.label} chart`}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </div>
        {/* Success indicator */}
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          rounded-2xl border border-dashed cursor-pointer
          transition-all duration-300 aspect-video
          flex flex-col items-center justify-center gap-4 p-6
          group
          ${
            isDragging
              ? "border-white/40 bg-white/[0.05] scale-[1.02]"
              : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
          }
          ${isUploading ? "opacity-50 pointer-events-none" : ""}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
        
        {/* Icon with glow effect */}
        <div className="relative">
          <span className="text-4xl group-hover:scale-110 transition-transform duration-300 block">
            {config.icon}
          </span>
          <div className="absolute inset-0 bg-white/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-white">{config.label}</p>
          <p className="text-xs text-white/40">{config.description}</p>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-white/30">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span>{isUploading ? "Processing..." : "Drop or click to upload"}</span>
        </div>
      </div>
      
      {error && (
        <p className="text-xs text-red-400 mt-2 px-1">{error}</p>
      )}
    </div>
  );
}
