import prisma from "@/app/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const blogID = url.searchParams.get("blogID");
    const blogDetails = await prisma.post.findUnique({
      where: {
        id: Number(blogID),
      },
    });

    if (blogDetails) {
      return NextResponse.json({
        success: true,
        data: blogDetails,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "記事の取得に失敗しました",
      });
    }
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({
    success: false,
    message: "エラーが発生しました",
  });
}
