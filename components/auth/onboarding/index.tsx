import { AuthHeader } from "../header";
import { OnboardingForm } from "./form";
import {
    Card,
    CardContent,
} from "@/components/ui/card"

export function OnboardingSection({ }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <Card className="w-full max-w-xl border-none shadow-none" >
            <CardContent>
                <AuthHeader className="my-4 text-center">Welcome, tell us a little about youself</AuthHeader>
                <OnboardingForm />
            </CardContent>
        </Card>
    )
}