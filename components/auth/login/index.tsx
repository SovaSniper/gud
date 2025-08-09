"use client"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { LogInForm } from "./form"

export function LogInSection({ }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card className="w-full max-w-xl border-none shadow-none" >
      <CardContent>
        <h2 className="my-2 text-center font-semibold text-2xl">Sign in to BBM</h2>
        <LogInForm />
      </CardContent>
    </Card>
  )
}
