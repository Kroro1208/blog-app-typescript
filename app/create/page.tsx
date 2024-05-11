"use client"

import Button from "../components/Button/button";
import { formInput } from "../utils/data";

export default function Create() {
    return (
        <section className="overflow-hidden py-16 md:py-20 lg:py-28">
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mb-12 rounded-md bg-primary/20 py-10 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                            <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                                ブログ記事を作成する
                            </h2>
                            <div>
                                <div className="flex flex-col gap-3">
                                    <div>
                                        <label className="mb-3 text-sm block font-medium text-dark dark:text-white">
                                            画像をアップロードする
                                        </label>
                                        <input type="file" id="fileInput" accept="image/*" max={1000000}
                                            className="w-full mb-8 rounded-xl border-transparent py-3 px-6 text-base
                                            text-body-color placeholder-body-color shadow-one outline-none
                                            focus:border-primary focus-visible:shadow-none dark:bg-[#41476f] dark:shadow-signUp"
                                        />
                                    </div>
                                    <div className="-mx-4 flex flex-wrap">
                                        {formInput.map((item) => (
                                            <div className="w-full px-4">
                                                <label className="mb-3 block text-sm font-bold text-dark dark:text-white">
                                                    {item.label}
                                                </label>
                                                {
                                                    item.component === "input" ? (
                                                        <input type={item.type} name={item.id} placeholder={item.placeholder}
                                                            className="w-full mb-8 rounded-xl border-transparent py-3 px-6 text-base
                                                        text-body-color placeholder-body-color shadow-one outline-none
                                                        focus:border-primary focus-visible:shadow-none dark:bg-[#41476f] dark:shadow-signUp"/>
                                                    ) :
                                                    item.component === "textarea" ? (
                                                        <textarea placeholder={item.placeholder} name={item.id} rows={5} className="w-full resize-none rounded-md border border-transparent py-3 px-6 text-base
                                                        text-body-color placeholder-body-color shadow-one outline-none
                                                        focus:border-primary focus-visible:shadow-none dark:bg-[#41476f] dark:shadow-signUp"/>
                                                    ) :
                                                    item.component === "select" ? (
                                                        <select name={item.id}  className="w-full mb-8 rounded-xl border-transparent py-3 px-6 text-base
                                                        text-body-color placeholder-body-color shadow-one outline-none
                                                        focus:border-primary focus-visible:shadow-none dark:bg-[#41476f] dark:shadow-signUp">
                                                            <option value={""} id="">Select</option>
                                                            {
                                                                item.options.map((itemOption) => (
                                                                <option id-={itemOption.value} value={itemOption.value}>
                                                                    {itemOption.label}
                                                                </option>
                                                                ))
                                                            }
                                                        </select>
                                                    ) : null }
                                            </div>
                                        ))}
                                        <div className="w-full px-5">
                                            <Button text="ブログを投稿" onClick={() => {}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}