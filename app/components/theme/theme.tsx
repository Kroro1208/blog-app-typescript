"use client"
import { GiMidnightClaw } from "react-icons/gi";
import { PiSun } from "react-icons/pi";
import { useTheme } from "next-themes"

export default function ThemeToggler() {
    const { theme, setTheme } = useTheme();

    return (
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {
                theme === "dark" ? <GiMidnightClaw size={30} /> : <PiSun size={30} />
            }
        </button>
    )
}