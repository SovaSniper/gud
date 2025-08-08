import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { FORM_CATEGORY, CreateListingFormProps } from "./schema"
import MultipleSelector, { Option } from '@/components/ui/multi-select';
import { listingCategory } from "@/lib/database/listingCategory";

const OPTIONS: Option[] = listingCategory.map(x => ({
    label: x.name,
    value: x.id.toString()
}))

export function FormCategory({ form }: CreateListingFormProps) {
    return (
        <FormField
            control={form.control}
            name={FORM_CATEGORY}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Frameworks</FormLabel>
                    <FormControl>
                        <MultipleSelector
                            {...field}
                            defaultOptions={OPTIONS}
                            placeholder="Select frameworks you like..."
                            emptyIndicator={
                                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                    no results found.
                                </p>
                            }
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
