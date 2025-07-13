import { UseFormReturn } from "react-hook-form"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CreateFormData } from "."
import { ChangeEvent, useState } from "react"
import { CreateFormComponentProps } from "./constants"
import { EventImage } from "@/components/core/event-image"

function getImageData(event: ChangeEvent<HTMLInputElement>) {
    // FileList is immutable, so we need to create a new one
    const dataTransfer = new DataTransfer();

    // Add newly uploaded images
    Array.from(event.target.files!).forEach((image) =>
        dataTransfer.items.add(image)
    );

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target.files![0]);

    return { file: files[0], displayUrl };
}

export function FormImage({ form }: CreateFormComponentProps) {
    const [preview, setPreview] = useState("");

    return (
        <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, value, ...rest } }) => (
                <>
                    <FormItem>
                        <FormLabel>Circle Image</FormLabel>
                        <FormControl>
                            <Input
                                type="file"
                                accept="image/png, image/jpeg"
                                {...rest}
                                onChange={(event) => {
                                    const { displayUrl } = getImageData(event)
                                    setPreview(displayUrl);
                                    onChange(event.target.files![0]);
                                }}
                            />
                        </FormControl>
                        {preview && (
                            <div className="flex items-center justify-center">
                                <EventImage src={preview} className="border rounded-lg" />
                            </div>
                        )}
                        <FormMessage />
                    </FormItem>
                </>
            )}
        />
    )
}
