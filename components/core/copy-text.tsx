"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface CopyTextProps extends React.HTMLAttributes<HTMLDivElement> {
  payload: string
}

export function CopyText({ payload }: CopyTextProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copyText = (entryText: string) => {
    navigator.clipboard.writeText(entryText)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1000)
  }

  return (
    <div
      className="flex cursor-pointer items-center space-x-2 text-base"
      onClick={() => copyText(payload || "")}
    >
      {isCopied ? (
        <Check className="h-3 text-emerald-400 lg:w-3" />
      ) : (
        <Copy className="h-3 lg:w-3" />
      )}
    </div>
  )
}