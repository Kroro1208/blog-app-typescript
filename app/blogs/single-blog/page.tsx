import { Blog } from "@/app/utils/types"
import { useSession } from "next-auth/react";
import Image from "next/image"
import Link from "next/link"
import { FaTrash } from "react-icons/fa";

const SingleBlog = ({ blogItem }: { blogItem: Blog }) => {
    const { image, category, title, description, userImage, userId } = blogItem;
    const { data: session } = useSession();
    return (
        <div>
            <div className="relative overflow-hidden rounded-md bg-white shadow-one dark:bg-dark">
                <Link href={"/"} className="relative block h-[250px] w-full p-3">
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
                <p className="h-[50px] text-ellipsis overflow-hidden whitespace-nowrap mb-6 pb-6
                    text-base text-body-color dark:border-white dark:border-opacity-10">
                    {description}
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center xl:mr-3 xl:pr-3 2xl:mr-5 sxl:pr-5">
                        <div className="mr-4">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                <Image alt="Author" fill src={userImage} />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <p className="mb-1 text-sm font-medium text-dark dark:text-white">
                                By
                            </p>
                            <p className="mb-1 text-md font-medium text-dark dark:text-white">
                                {userId.split('_')[0].toUpperCase()}
                            </p>
                        </div>
                        <div>
                            {
                                session != null && session?.user?.name === userId ?
                                    <FaTrash size={35} className="cursor-pointer pl-4" /> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleBlog
