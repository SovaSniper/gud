'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUserRound, Home, Settings } from "lucide-react";
import clsx from "clsx";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";

export function Sidebar() {
    const pathname = usePathname();

    const { data: session } = useSession();

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
                href="/create"
                className={clsx("flex items-center gap-2 p-2 rounded hover:bg-gray-200", {
                    "bg-gray-300": pathname === "/settings",
                })}
            >
                <Settings className="w-5 h-5" />
                <span>Create</span>
            </Link>

            <Link
                href={`/u/${session?.user.handler}`}
                className={clsx("flex items-center gap-2 p-2 rounded hover:bg-gray-200", {
                    "bg-gray-300": pathname === "/settings",
                })}
            >
                <CircleUserRound className="w-5 h-5" />
                <span>Profile {session?.user.handler}</span>
            </Link>


            <div className="flex items-center justify-center my-4">
                <Button onClick={() => signOut()}>
                    Sign out
                </Button>
            </div>
        </div>
    );
}
