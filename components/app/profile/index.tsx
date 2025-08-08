"use client"

import { Input } from "@/components/ui/input"
import { useApp } from "../provider"
import { ProfileImage } from "./image"
import { ProfileLocation } from "./location"
import { CopyText } from "@/components/core/copy-text"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

export function ProfilePage({ }: React.HTMLAttributes<HTMLDivElement>) {
  const { loggedInUser, loggedInUseUrl } = useApp()

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      Account Settings

      <div className="flex items-center">
        <ProfileImage src={loggedInUseUrl} />
        <Button variant="outline" className="rounded-sm">
          <CopyText payload={loggedInUser?.uuid || ""} />
          Copy Id
        </Button>
      </div>

      <Card className="w-full shadow-none" >
        <CardContent>
          <CardTitle className="py-1">Basic</CardTitle>

          <div className="grid grid-cols-12 gap-2 mb-2 px-1 py-4">
            <div className="col-span-12 lg:col-span-6">
              <label className="text-muted-foreground text-sm">Name</label>
              <Input className="bg-transparent! border-none" disabled={true} value={loggedInUser?.firstname || ""} />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <label className="text-muted-foreground text-sm">Surname</label>
              <Input className="bg-transparent! border-none" disabled={true} value={loggedInUser?.lastname || ""} />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <label className="text-muted-foreground text-sm">Email</label>
              <Input className="mt-2" value={loggedInUser?.email || ""} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full shadow-none" >
        <CardContent>
          <CardTitle className="py-1">Location</CardTitle>

          <ProfileLocation />
        </CardContent>
      </Card>

      {JSON.stringify(loggedInUser)}
    </div>
  )
}