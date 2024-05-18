import prisma from "@/app/database";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const extractId = url.searchParams.get("id");

    const deletedBlogPost = await prisma.post.delete({
      where: {
        id: Number(extractId),
      },
    });

    if (deletedBlogPost) {
      return NextResponse.json({
        success: true,
        message: "記事の削除に成功しました",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "記事が削除できませんでした",
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
