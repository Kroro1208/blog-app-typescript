"use client"

import { Blog } from "@/app/utils/types"
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const BlogDetailsHome = ({ blogData }: { blogData: Blog }) => {
    const [comment, setComment] = useState<string>("");
    const { data: session } = useSession();
    const router = useRouter();

    async function handleComment() {
        if (!comment.trim()) return; // 空文字では送信不可
        let extractComments = [...blogData.comments];
        extractComments.push(`${comment}|${session?.user?.name}`)
        const response = await fetch(`/api/blog-post/update-post`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: blogData?.id,
                comments: extractComments
            })
        });

        const data = await response.json();

        if (data && data.success) {
            setComment('');
            router.refresh();
        }
    }

    useEffect(() => {
        let interval = setInterval(() => {
            router.refresh();
        }, 2000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    if (!blogData) return null;

    return (
        <section className="pt-[150px] pb-[120px]">
            <div className="container">
                <div className="-mx-4 flex flex-col gap-4 items-center justify-center">
                    <div className="w-full px-4 lg:w-8/12">
                        <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                            {blogData?.title}
                        </h2>
                        <div className="mb-10 flex flex-wrap items-center justify-between border-b
                         border-body-color border-opacity-50 dark:border-white dark:border-opacity-10">
                            <div className="flex flex-wrap items-center">
                                <div className="mr-10 mb-5 flex items-center">
                                    <div className="mr4">
                                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                            <Image src={blogData?.userImage} alt="User" fill />
                                        </div>
                                    </div>
                                    <div className="w-full flex">
                                        <h4 className="mb-1 ml-2 text-base font-medium text-body-color">
                                            by
                                        </h4>
                                        <span className="pl-2">{blogData?.userId.split('_')[0]}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <Link
                                    className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold text-white"
                                    href={`/category/${blogData?.category}`}>
                                    {blogData?.category}
                                </Link>
                            </div>
                        </div>
                        <div>
                            <div className="mb-10 w-full overflow-hidden rounded-xl">
                                <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                                    <Image
                                        className="object-cover object-center"
                                        src={blogData?.image} alt="Blog" fill />
                                </div>
                            </div>
                            <p className="mb-8 leading-relaxed text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                                {blogData?.description}
                            </p>
                        </div>
                    </div>
                    <div className="w-full lg:w-8/12 flex gap-4">
                        {
                            session !== null ?
                                <>
                                    <input
                                        id="comment" type="text" name="comment" placeholder="コメントを入力" autoFocus autoComplete="false"
                                        value={comment} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setComment(event.target.value)}
                                        className="w-full rounded-md border border-body-color py-3 px-6 text-base text-body-color
                                        placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none
                                        dark:bg-[#242B51] dark:shadow-signUp"
                                    />
                                    <button
                                        onClick={handleComment}
                                        disabled={!comment.trim()}
                                        className="border border-body-color hover:bg-primary hover:text-white rounded-lg py-3 px-4">
                                        <FontAwesomeIcon icon={faPaperPlane} size="lg" />
                                    </button>
                                </>
                                : null
                        }

                    </div>
                    <section className="dark:bg-gray-900 py-8 lg:py-16 w-full lg:w-8/12">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg lg:text-2xl font-bold text-black dark:text-white">
                                コメント数({blogData?.comments.length})
                            </h2>
                        </div>
                        {
                            (blogData && blogData.comments && blogData.comments.length > 0) ?
                                blogData.comments.map((comment) => (
                                    <div className="p-6 text-base rounded-lg dark:bg-gray-900">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <p className="inline-flex items-center mr-3 text-sm text-black dark:text-white font-semibold">
                                                    {
                                                        comment.split('|')[1] === blogData?.userId ? `${comment.split('|')[1].split('_')[0]}(Author)`
                                                            : comment.split('|')[1].split('_')[0]
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-gra-500 dark:text-gray-400">
                                                {comment.split('|')[0]}
                                            </p>
                                        </div>
                                    </div>
                                ))
                                : null
                        }
                    </section>
                </div>
            </div>
        </section>
    );
}

export default BlogDetailsHome
