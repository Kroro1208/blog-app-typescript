import { Blog } from "@/app/utils/types"
import Image from "next/image"
import Link from "next/link"

const SingleBlog = ({ blogItem }: { blogItem: Blog }) => {
    const { image, category } = blogItem;
    return (
        <div className="relative overflow-hidden rounded-md bg-white shadow-one dark:bg-dark">
            <Link href={"/"}>
                <span className="absolute top-6 z-20 inline-flex items-center justify-center
                rounded-full bg-primary py-2 px-4 font-semibold capitalize text-white">
                    {category}
                </span>
                <Image src={image} alt="BlogPost" fill />
            </Link>
        </div>
    )
}

export default SingleBlog
