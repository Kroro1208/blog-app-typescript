'use client'

import Button from "../components/Button/button"

export default function Search() {
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
                                    />
                                </div>
                                <div>
                                    <Button
                                        text="検索する"
                                        onClick={() => { }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}