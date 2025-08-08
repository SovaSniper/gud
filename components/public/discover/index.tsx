"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategoryCountEntityResult } from "@/lib/database/category"

interface DiscoverPageProps extends React.HTMLAttributes<HTMLDivElement> {
  categoryCount: CategoryCountEntityResult
}

export function DiscoverPage({ categoryCount }: DiscoverPageProps) {

  return (
    <div>
      Discover

      <Input />


      <div className="flex gap-2">
        {categoryCount && categoryCount.map((category) => {
          return (
            <Button
              key={category.id}
              variant="outline"
            >
              {category.name} ({category.count})
            </Button>
          )
        })}
      </div>
    </div>
  )
}