import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function Page() {
    return (
        <div className="h-[100vh] w-[100%] flex items-center justify-center">
            Check your email
            We just sent a verification link to email

            <Button onClick={redirect("/login")}>Login</Button>
        </div>
    );
}
