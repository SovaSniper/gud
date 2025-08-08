"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ThemeButton } from '../core/theme-button';
// import { NavMenu } from './nav-menu';

export function MainNavBar({ }: React.HTMLAttributes<HTMLDivElement>) {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between h-[56px] px-8 rounded-lg">
            <div className="flex items-center space-x-4 hover:cursor-pointer hover:text-primary" onClick={() => router.push("/")}>
                <div>
                    <Image src="/file.svg" height={18} width={18} alt="logo" />
                </div>
                <div className="text-xl font-semibold hidden sm:block">BBM</div>
            </div>
            <div className="flex items-center gap-2">
                <Button onClick={() => router.push("/login")}>Sign in</Button>
                <Button onClick={() => router.push("/signup")}>Register</Button>
                <ThemeButton />
            </div>
            {/* <div className="flex items-center gap-2">
            </div> */}
        </div>
    )
};
