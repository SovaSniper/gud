import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { ProfileForm } from "./form"

export function FormCard({ }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <Card className="w-full max-w-xl border-none shadow-none">
            <CardContent>
                <ProfileForm />
            </CardContent>
        </Card>
    )
}
