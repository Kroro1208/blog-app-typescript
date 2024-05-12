import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "問題が発生しました。再度やり直してください",
    });
  }
}
