"use client"

import { Blog } from "@/app/utils/types"

export default function BlogLists({ lists }: { lists: Blog[] }) {
    return (
        <section className="pt-[120px] pb-[120px]">
            <div className="container">
                <div className="-mx-4 grid grid-cols-3 gap-2">
                    {
                        lists && lists.length ? lists.map((listItem: Blog) =>
                            <div className="px-4" key={listItem.id}>
                                
                            </div>) : null
                    }
                </div>
            </div>
        </section>
    )
}