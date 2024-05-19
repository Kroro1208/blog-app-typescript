import prisma from "@/app/database";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const extractData = await request.json();
    const updateBlogPost = await prisma.post.update({
      where: {
        id: Number(extractData.id),
      },
      data: {
        comments: extractData.comments,
      },
    });

    if (updateBlogPost) {
      return NextResponse.json({
        success: true,
        message: "記事が更新されました",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "更新に失敗しました",
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
