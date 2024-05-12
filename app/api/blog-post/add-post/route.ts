import prisma from "@/app/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const extractPostData = await request.json();
    const newlyCreatePost = await prisma.post.create({
      data: extractPostData,
    });
    console.log(extractPostData);

    if (newlyCreatePost) {
      return NextResponse.json({
        success: true,
        message: "新しいブログが投稿されました",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "ブログの投稿に失敗しました",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "問題が発生しました。再度やり直してください",
    });
  }
}
