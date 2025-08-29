import { NextResponse } from "next/server";
import { apiResponse } from "@/types/api-response";

export function success<T>(
  data: T,
  status: number = 200
) {
  const response: apiResponse<T> = {
    success: true,
    data,
  };

  return NextResponse.json(response, { status });
}

export function failure(error: string, status: number = 400) {
  const response: apiResponse = {
    success: false,
    error,
  };

  return NextResponse.json(response, { status });
}
