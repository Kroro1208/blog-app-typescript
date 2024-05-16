import { Blog } from "@/app/utils/types"
import Image from "next/image"
import Link from "next/link"

const SingleBlog = ({ blogItem }: { blogItem: Blog }) => {
    const { image, category, title, description, userimage, userid } = blogItem;
    return (
        <div>
            <div className="relative overflow-hidden rounded-md bg-white shadow-one dark:bg-dark">
                <Link href={"/"}>
                    <span className="absolute top-6 z-20 inline-flex items-center justify-center
                    rounded-full bg-primary py-2 px-4 font-semibold capitalize text-white">
                        {category}
                    </span>
                    <Image src={image} alt="BlogPost" fill />
                </Link>
            </div>
            <div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
                <h3>
                    <Link className="mb-4 text-ellipsis overflow-hidden whitespace-nowrap
                        block text-xl font-bold text-black hover:text-primary
                        dark:text-white dark:hover:text-primary sm:text-2xl"
                        href={"/"}>
                        {title}
                    </Link>
                </h3>
                <p className="h-[100px] text-ellipsis overflow-hidden whitespace-nowrap mb-6 pb-6
                    text-base text-body-color dark:border-white dark:border-opacity-10">
                    {description}
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center xl:mr-3 xl:pr-3 2xl:mr-5 sxl:pr-5">
                        <div className="mr-4">
                            <div className="h-10 w-10 overflow-hidden rounded-full">
                                <Image alt="Author" fill src={userimage} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className="mb-1 text-sm font-medium text-dark dark:text-white">
                                By
                            </p>
                            <p className="mb-1 text-sm font-medium text-dark dark:text-white">
                                {userid.split('_')[0].toUpperCase()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleBlog
