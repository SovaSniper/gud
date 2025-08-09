import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { FORM_TERMS_AND_POLICY, SignupFormProps } from "./schema"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export function FormTermsPolicy({ form }: SignupFormProps) {
  return (
    <FormField
      control={form.control}
      name={FORM_TERMS_AND_POLICY}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center gap-2">
              <Checkbox
                className="m-0"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <TermsPolicyText />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function TermsPolicyText() {
  return (
    <p className="text-sm text-muted-foreground">
      By continuing I agree to the{" "}
      <Link
        href="/terms"
        target="_blank"
        className="underline hover:text-primary"
      >
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link
        href="/policy"
        target="_blank"
        className="underline hover:text-primary"
      >
        Privacy Policy
      </Link>
      .
    </p>
  );
};
