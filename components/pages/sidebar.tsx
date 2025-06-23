'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings } from "lucide-react";
import clsx from "clsx";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="space-y-2">
            <Link
                href="/app/home"
                className={clsx("flex items-center gap-2 p-2 rounded hover:bg-gray-200", {
                    "bg-gray-300": pathname === "/",
                })}
            >
                <Home className="w-5 h-5" />
                <span>Home</span>
            </Link>

            <Link
                href="/app/settings"
                className={clsx("flex items-center gap-2 p-2 rounded hover:bg-gray-200", {
                    "bg-gray-300": pathname === "/settings",
                })}
            >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
            </Link>

            <Button onClick={() => signOut()}>
                Sign out
            </Button>
        </div>
    );
}
