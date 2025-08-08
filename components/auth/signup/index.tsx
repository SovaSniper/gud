import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { SignUpForm } from "./form"

export function SignUpSection({ }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <Card className="w-full max-w-xl border-none shadow-none" >
            <CardContent>
                <SignUpForm />
            </CardContent>
        </Card>
    )
}
