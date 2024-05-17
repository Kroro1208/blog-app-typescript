"use client"

import { useSession } from "next-auth/react";
import { createContext, Dispatch, SetStateAction, useState } from "react"
import Spinner from "../components/Spinner/spinner";
import { Blog, BlogFormData } from "../utils/types";
import { initialBlogFormData } from "../utils/data";

type ContextType = {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    formData: BlogFormData;
    setFormData: Dispatch<SetStateAction<BlogFormData>>;
    searchQuery: string;
    setSearchQuery: Dispatch<SetStateAction<string>>;
    searchBlog: Blog[];
    setSearchBlog: Dispatch<SetStateAction<Blog[]>>;
};

const initialState = {
    loading: false,
    setLoading: () => { },
    formData: initialBlogFormData,
    setFormData: () => { },
    searchQuery: "",
    setSearchQuery: () => { },
    searchBlog: [],
    setSearchBlog: () => { }
}

export const GlobalContext = createContext<ContextType>(initialState);

export default function GlobalState({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const [formData, setFormData] = useState(initialBlogFormData);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchBlog, setSearchBlog] = useState<Blog[]>([]);

    if (session === undefined) return <Spinner />

    return (
        <GlobalContext.Provider
            value={{
                loading,
                setLoading,
                formData,
                setFormData,
                searchQuery,
                setSearchQuery,
                searchBlog,
                setSearchBlog
            }}>
            {children}
        </GlobalContext.Provider >
    );
}
