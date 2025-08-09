import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreateFormProps, FORM_CONDITION } from "./schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ItemsCondition } from "@/lib/database/enum/items-condition";
import { useState } from "react";
import { Input, inputVariants } from "@/components/core/input";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";

const conditionOptions = Object.entries(ItemsCondition)
  .filter(([key, value]) => isNaN(Number(key)))
  .map(([label, value]) => ({
    label,
    value: value.toString(),
  }));

export function FormCondition({ form }: CreateFormProps) {


  return (
    <FormField
      control={form.control}
      name={FORM_CONDITION}
      render={({ field }) => (
        <FormItem>
          <div className="relative">
            <label
              className={cn(
                "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75",
                "top-4 z-10 origin-[0] start-2.5 peer-focus:text-primary peer-focus:dark:text-primary",
                "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4",
                "rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                "px-2 font-semibold capitalize",
                field.value
                  ? "text-xs top-[18px] bg-white scale-90"
                  : "text-sm top-[30px] scale-100"
              )}
            >
              Condition
            </label>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className={cn(inputVariants(), "h-12! shadow-none pt-[28px]!")}>
                  <SelectValue placeholder=" " />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {conditionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              You can manage email addresses in your email settings.
            </FormDescription>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}


export function FloatingLabelSelect({
  label,
  options,
}: {
  label: string;
  options: { value: string; label: string }[];
}) {
  const [value, setValue] = useState("");

  return (
    <div className="relative w-64">
      {/* Floating label */}
      <label
        className={`absolute left-3 transition-all duration-200 text-gray-500 pointer-events-none
          ${value
            ? "text-xs -top-2 bg-white px-1"
            : "top-3 text-sm"
          }`}
      >
        {label}
      </label>

      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="pt-5">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
