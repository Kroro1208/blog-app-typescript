import { FormInput, MenuItem, Option } from "./types";

export const menuItems: MenuItem[] = [
    {
        id: "home",
        label: "Home",
        path: "/"
    },
    {
        id: "category",
        label: "カテゴリー",
        path: "/category"
    },
    {
        id: "blogs",
        label: "ブログ",
        path: "/blogs"
    },
    {
        id: "search",
        label: "検索",
        path: "/search"
    }
];

export const categories: Option[] = [
    {
        value: "application",
        label: "Application"
    },
    {
        value: "ai",
        label: "AI"
    },
    {
        value: "software",
        label: "Software"
    },
    {
        value: "science",
        label: "Science"
    },
    {
        value: "tech",
        label: "Technology",
    },
];

export const formInput: FormInput[] = [
    {
        id: "title",
        label: "Title",
        placeholder: "ブログタイトルを入力してください",
        type: "text",
        component: "input",
        options: [],
    },
    {
        id: "description",
        label: "Description",
        placeholder: "ブログの内容を記載してください",
        type: "text",
        component: "textarea",
        options: [],
    },
    {
        id: "category",
        label: "Category",
        placeholder: "ブログのカテゴリーを選んでください",
        type: "",
        component: "select",
        options: categories,
    },
];


export const initialBlogFormData = {
    title: '',
    description: '',
    image: '',
    category: ''
}

