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
          <FormLabel>Email</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
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
        </FormItem>
      )}
    />
  );
}
