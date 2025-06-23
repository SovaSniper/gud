"use client"

import { LoadingPage } from "@/components/core/loading-page";
import { Sidebar } from "@/components/pages/sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

enum NextAuthStatus {
    LOADING = 'loading',
    AUTHENTICATED = 'authenticated',
    UNAUTHENTICATED = 'unauthenticated'
}
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
        },
    })

    if (status === NextAuthStatus.LOADING) {
        return (
            <LoadingPage />
        );
    }

    return (
        <div className="grid grid-cols-12 gap-4 max-w-screen-xl mx-auto min-h-screen px-4">
            <aside className="col-span-2 hidden sm:block">
                <div className="sticky top-4">
                    <Sidebar />
                </div>
            </aside>

            <main className="col-span-12 sm:col-span-7">
                <div className="max-w-2xl mx-auto">
                    {children}
                </div>
            </main>

            <aside className="col-span-3 hidden lg:block">
                <div className="sticky top-4 bg-accent">
                    <p className="text-gray-500">Right Sidebar</p>
                </div>
            </aside>
        </div>
    );
}
