import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CreateForm } from "."

export function CardDemo() {
    return (
        <Card className="w-full max-w-xl border-none shadow-none">
            <CardContent>
                <CreateForm />
            </CardContent>
        </Card>
    )
}
