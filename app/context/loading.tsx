"use client"

import { useSession } from "next-auth/react";
import { createContext, Dispatch, SetStateAction, useState } from "react"
import Spinner from "../components/Spinner/spinner";

type ContextType = {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>
}

const initialState = {
    loading: false,
    setLoading: () => { }
}

const GlobalContext = createContext<ContextType>(initialState);

export default function GlobalState({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();

    if (session === undefined) return <Spinner />

    return (
        <GlobalContext.Provider value={{ loading, setLoading }}>
            {children}
        </GlobalContext.Provider >
    );
}
