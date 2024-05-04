"use client"
import { GiMidnightClaw } from "react-icons/gi";
import { PiSun } from "react-icons/pi";
import { useTheme } from "next-themes"

export default function ThemeToggler() {
    const { theme, setTheme } = useTheme();

    return (
        <button className="text-3xl" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {
                theme === "dark" ? <GiMidnightClaw /> : <PiSun />
            }
        </button>
    )
}