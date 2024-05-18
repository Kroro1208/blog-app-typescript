'use client'

import { useContext } from "react"
import Button from "../components/Button/button"
import { GlobalContext } from "../context/loading"
import { Blog } from "../utils/types";
import SingleBlog from "../blogs/single-blog/page";
import { useRouter } from "next/navigation";

export default function Search() {
    const { searchQuery, setSearchQuery, searchBlog, setSearchBlog } = useContext(GlobalContext);
    const router = useRouter();

    async function fetchSearchBlog(query: string) {
        const res = await fetch(`/api/search?query=${query}`, {
            method: 'GET',
            cache: 'no-store'
        });

        const data = await res.json();
        console.log(data, '検索データ')
        if (data.success) {
            setSearchBlog(data.data);
        }
    }

    async function handleSearch() {
        fetchSearchBlog(searchQuery);
    }


    async function handleDelete(id: number) {
        console.log(id);
        const res = await fetch(`/api/blog-post/delete-post?id=${id}`, {
            method: "DELETE",
            cache: "no-store"
        });

        const data = await res.json();
        if (data && data.success) fetchSearchBlog(searchQuery);
    }

    return (
        <section className="overflow-hidden py-40 md:py-36 lg:py-28">
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mb-12 rounded-md bg-primary/[3%] py-11 px-8
                        dark:bg-dark sm:p-[50px] lg:mb-5 lg:px-8 xl:p-[55px]">
                            <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                                記事を検索
                            </h2>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <input type="text" name="search" id="search" placeholder="キーワードを入力" autoFocus autoComplete="off"
                                        className="w-full rounded-md border border-transparent py-2 px-6 text-base
                                    text-black dark:text-white placeholder-body-color shadow-md outline-none
                                    focus:border-primary focus-visible:shadow-none dark:bg-[#505578] dark:shadow-signUp"
                                        value={searchQuery}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Button
                                        text="検索する"
                                        onClick={handleSearch}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="pt-[80px] w-full pb-[120px]]">
                        <div className="container">
                            <div className="-mx-4 flex flex-wrap">
                                {
                                    (searchBlog && searchBlog.length) ? searchBlog.map((item: Blog) => {
                                        return (
                                            <div key={item.id} className="w-full px-4 md-w-2/3 lg:w-1/2 xl:w-1/3">
                                                <SingleBlog handleDelete={handleDelete} blogItem={item} />
                                            </div>
                                        )
                                    }) : <h1>検索結果がありませんでした</h1>
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    )
}