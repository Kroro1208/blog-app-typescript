import CategoryList from "@/app/components/category";
import { Blog } from "@/app/utils/types";

async function getCategoryBlogsById(categoryId: string): Promise<Blog[]> {
    const res = await fetch(`${process.env.URL}/api/category?categoryID=${categoryId}`, {
        method: "GET",
        cache: "no-store"
    });

    const data = await res.json();
    if (data.success) return data.data;
    return [];
}

const CategoryPage = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const categoryBlogs = await getCategoryBlogsById(id);
    return (
        <div>
            <CategoryList list={categoryBlogs} />
        </div>
    );
}

export default CategoryPage;
