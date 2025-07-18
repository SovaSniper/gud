"use client"

import * as React from "react"
import { Moon, SunMedium } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"

export function ThemeButton() {
    const { setTheme, theme } = useTheme()

    return (
        <div
            className={cn(
                buttonVariants({ size: "icon", variant: "ghost" }),
                "cursor-pointer border-0"
            )}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            <SunMedium className="h-6 w-[1.3rem] dark:hidden" />
            <Moon className="hidden size-5 dark:block" />
            <span className="sr-only">Toggle theme</span>
        </div>
    )
}