
async function extractAllBlogs() {
    const res = await fetch(`${process.env.URL}/api/blog-post/get-all-post`, {
        method: "GET",
        cache: 'no-store'
    });
    const data = await res.json();
    if (data.success) return data.data;
}

export default async function Blogs() {
    const blogPostList = await extractAllBlogs();
    return <div>{blogPostList}</div>
}