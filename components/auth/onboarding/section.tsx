import { Card, CardContent } from "@/components/ui/card";
import { OnboardingForm } from "./form";

export function OnboardingSection({ }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <Card className="w-full max-w-xl shadow-none" >
            <CardContent>
                <h2 className="effect-font-styling text-[28px] leading-[34px] tracking-[-0.045rem] text-gray-10 mt-6 font-semibold font-display text-balance">
                    Basic Details
                </h2>
                
                <OnboardingForm />
            </CardContent>
        </Card>
    )
}