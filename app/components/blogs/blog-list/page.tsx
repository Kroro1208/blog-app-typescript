"use client"
import SingleBlog from "@/app/blogs/single-blog/page"
import { Blog } from "@/app/utils/types"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function BlogLists({ lists }: { lists: Blog[] }) {
    const router = useRouter();
    useEffect(() => {
        router.refresh();
    }, []);

    console.log('lists:', lists);

    return (
        <section className="pt-[120px] pb-[120px]">
            <div className="container">
                <div className="-mx-4 grid grid-cols-3 gap-2">
                    {
                        (lists && lists.length) ? lists.map((listItem: Blog) => (
                            <div className="px-4" key={listItem.id}>
                                <SingleBlog blogItem={listItem} />
                            </div>))
                            : null
                    }
                </div>
            </div>
        </section>
    )
}