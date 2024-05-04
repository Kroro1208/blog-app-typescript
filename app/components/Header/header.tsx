"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
    const [sticky, setSticky] = useState<boolean>(false);
    function handleStickyNavBar() {
        if (window.scrollY >= 80) setSticky(true);
        else setSticky(false);
    }
    useEffect(() => {
        window.addEventListener('scroll', handleStickyNavBar)
    })

    return (
        <header className={`top-0 left-0 flex w-full items-center bg-transparent
        ${sticky ? '!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky background:blur-sm !transition dark:!bg-primary dark:!bg-opacity-20'
                : 'absolute'
            }
        `}>
            <div className="container">
                <div className="relative -mx-4 flex items-center justify-between">
                    <div className="w-60 max-w-full px-4 xl:mr-12">
                        <Link href={'/'} className={`text-[30px] font-extrabold cursor-pointer block w-full
                            ${sticky ? "py-5 lg:py-2" : "py-8"}
                        `}>
                            NextBlog
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
