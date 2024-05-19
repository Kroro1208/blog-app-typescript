"use client"

import { Blog } from "@/app/utils/types"

const BlogDetailsHome = ({ blogData }: { blogData: Blog }) => {
    console.log(blogData);

    return (
        <div>
            ブログの詳細
        </div>
    );
}

export default BlogDetailsHome
