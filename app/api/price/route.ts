import { NextRequest } from "next/server";
import { getRealtimePrice } from "@/lib/forex-prices";
import { isValidPair } from "@/lib/forex-pairs";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pair = searchParams.get("pair");

  if (!pair || !isValidPair(pair)) {
    return Response.json(
      { success: false, error: "Invalid or missing currency pair" },
      { status: 400 }
    );
  }

  const result = await getRealtimePrice(pair);

  if (!result.success) {
    return Response.json(result, { status: 500 });
  }

  return Response.json(result);
}
