import { UseFormReturn } from "react-hook-form"
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { RegisterFormData } from "./form"
import { UserGender } from "@/lib/models/user-gender"

interface FormGenderProps extends React.HTMLAttributes<HTMLDivElement> {
    form: UseFormReturn<RegisterFormData>
}

export function FormGender({ form }: FormGenderProps) {
    return (
        <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            className="flex flex-col space-y-1"
                        >
                            {[
                                ["Male", UserGender.MALE],
                                ["Female", UserGender.FEMALE],
                                ["Non-binary", UserGender.NON_BINARY],
                                ["Other", UserGender.OTHER]
                            ].map((option, index) => (
                                <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                                    <FormControl>
                                        <RadioGroupItem value={option[1]} />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        {option[0]}
                                    </FormLabel>
                                </FormItem>
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <FormDescription>
                        This is your public display name.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}