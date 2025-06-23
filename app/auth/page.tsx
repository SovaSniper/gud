import { AuthEmail } from "@/components/auth/form";

export default function Home() {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <div className="hidden md:block md:w-1/2 bg-secondary p-6"></div>
            <div className="w-full md:w-1/2 p-6 min-h-screen flex items-center justify-center">
                <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
                        <p className="text-muted-foreground text-sm">
                            Enter your email below to create your account
                        </p>
                    </div>

                    <AuthEmail />
                </div>
            </div>
        </div>
    );
}
