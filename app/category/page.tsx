import { categories } from "@/app/utils/data";
import Link from "next/link";

const CategoryIndex = () => {
    return (
        <section className="pt-[120px] pb-[120px]">
            <div className="container">

                <h1 className="text-3xl font-extrabold mb-8 mt-8">全てのカテゴリー</h1>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map(category => (
                        <Link href={`/category/${category.value}`}>
                            <p className="block border py-4 transition-all duration-300 border-body-color rounded-lg hover:bg-primary hover:text-white
                            text-center text-xl font-semibold text-primary">
                                {category.label}
                            </p>
                        </Link>
                    ))}
                </ul>

            </div>
        </section>
    );
}

export default CategoryIndex;
