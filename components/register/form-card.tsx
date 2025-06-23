import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card"
import { ProfileForm } from "./form"

export function FormCard({ }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <Card className="w-full max-w-sm max-h-[90vh] overflow-auto shadow-none">
            <CardContent>
                <div className="py-6 pt-0">
                    <CardTitle className="text-center font-semibold text-2xl">Create an account</CardTitle>
                </div>
                <ProfileForm />
            </CardContent>
        </Card>
    )
}
