"use client"

import { useApp } from "../provider"

export function ListPage({ }: React.HTMLAttributes<HTMLDivElement>) {
  const { loggedInUser, loggedInUseUrl } = useApp()

  return (
    <div>
      Listing
    </div>
  )
}
