"use client"

import { createContext, Dispatch, SetStateAction, useState } from "react"

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
    return (
        <GlobalContext.Provider value={{ loading, setLoading }}>
            {children}
        </GlobalContext.Provider >
    );
}
