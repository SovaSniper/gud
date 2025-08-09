import { cn } from "@/lib/utils";

export function AuthHeader({ className, children, ...props }: React.HTMLAttributes<HTMLHeadElement>) {
  return (
    <h2 className={cn("font-semibold text-2xl", className)} {...props}>
      {children}
    </h2>
  )
}