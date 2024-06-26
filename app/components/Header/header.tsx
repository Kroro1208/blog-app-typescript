"use client";

import { menuItems } from "@/app/utils/data";
import { MenuItem } from "@/app/utils/types";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Button from "../Button/button";
import ThemeToggler from "../theme/theme";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { GlobalContext } from "@/app/context/loading";

export default function Header() {
    const [sticky, setSticky] = useState<boolean>(false);
    const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
    const router = useRouter();
    const { setSearchBlog, setSearchQuery } = useContext(GlobalContext);
    const { data: session } = useSession();
    console.log(session, "session");

    const pathName = usePathname();

    function handleStickyNavBar() {
        if (window.scrollY >= 80) setSticky(true);
        else setSticky(false);
    }

    function handleNavBarOpen() {
        setNavbarOpen(!navbarOpen);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleStickyNavBar);
    });

    // 検索後、別ページを表示してから戻ってきたときに検索結果をクリアにする処理
    useEffect(() => {
        setSearchBlog([]);
        setSearchQuery('');
    }, [pathName]);

    // stickyがtrueの場合、ヘッダーを固定して背景が白く半透明になり、ぼかしエフェクトが適用される
    return (
        <header className={`top-0 left-0 z-40 flex w-full items-center bg-transparent
        ${sticky ? '!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky background:blur-sm !transition dark:!bg-primary dark:!bg-opacity-20'
                : 'absolute'
            }
        `}>
            <div className="container">
                <div className="relative -mx-4 flex gap-2 items-center justify-between">
                    <Image
                        className="hidden md:block"
                        src={"/blog.png"} alt="blog" width={60} height={60} />
                    <div className="w-80 max-w-full xl:mr-12 flex gap-2">
                        <Link href={'/'} className={`text-[30px] font-extrabold cursor-pointer block w-full
                            ${sticky ? "py-5 lg:py-2" : "py-8"}
                        `}>
                            Next Tech Blog
                        </Link>
                    </div>
                    <div className="flex w-full items-center justify-between px-4">
                        <div>
                            <button
                                onClick={handleNavBarOpen}
                                id="navbarToggler"
                                arial-label="Mobile-Menu"
                                className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                            >
                                <span
                                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white
                                        ${navbarOpen ? "top-[7px] rotate-45" : ""}
                                        `}
                                />
                                <span
                                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white
                                        ${navbarOpen ? "opacity-0" : ""}
                                        `}
                                />
                                <span
                                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white
                                        ${navbarOpen ? "top-[-8px] -rotate-45" : ""}
                                        `}
                                />
                            </button>
                            <nav
                                id="navbarCollapse"
                                className={`absolute right-0 z-30 w-[250px] rounded border-[0.5px] bg-white border-body-color/50
                                py-4 px-6 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100
                                ${navbarOpen ? 'visible top-full opacity-100' : "invisible top-[120%] opacity-0"}
                                `} >
                                <ul className="block lg:flex lg:space-x-12">
                                    {menuItems.map((item: MenuItem) => (
                                        <li key={item.id} className="group relative">
                                            <Link href={item.path} className={`flex py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0
                                                `}>
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                        <div className="flex gap-4 items-center justify-end pr-16 lg:pr-0">
                            {
                                session !== null ? <Button onClick={() => router.push('/create')} text="Create" /> : null
                            }
                            <Button onClick={session !== null ? () => signOut() : () => signIn("github")} text={session !== null ? "Logout" : "Login"} />
                            <div className="flex gap-3 items-center">
                                <ThemeToggler />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
