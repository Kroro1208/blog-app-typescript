import CategoryList from "@/app/components/category";

async function getAllCategories(getId: string) {
    const res = await fetch(`${process.env.URL}/api/category?categoryID=${getId}`, {
        method: "GET",
        cache: "no-store"
    });

    const data = await res.json();
    if (data.success) return data.data;
}

const CategoryPage = async ({ params }: { params: any }) => {
    const { id } = params;
    const getAllList = await getAllCategories(id);
    return (
        <div>
            <CategoryList list={getAllList} />
        </div>
    )
}

export default CategoryPage
