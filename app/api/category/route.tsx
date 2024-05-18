import prisma from "@/app/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const extractCategoryID = searchParams.get('categoryID');

        const getBlogCategoryID = await prisma.post.findMany({
            where: {
                category: extractCategoryID || "",
            }
        });
        if (getBlogCategoryID) {
            return NextResponse.json({
                success: true,
                data: getBlogCategoryID
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "エラーが発生しました"
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "エラーが発生しました"
        });
    }
}