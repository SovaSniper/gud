import { UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calender";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";
import { CreateFormProps } from "./schema";

export function FormTime({ form }: CreateFormProps) {
    const onDateChange = (newDate: Date | undefined) => {
        if (!newDate) return;

        // const currentTime = form.getValues("time");
        // if (currentTime instanceof Date && !isNaN(currentTime.getTime())) {
        //     newDate.setHours(
        //         currentTime.getHours(),
        //         currentTime.getMinutes(),
        //         currentTime.getSeconds(),
        //         0
        //     );
        // }

        // form.setValue("time", newDate);
    };

    const onTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const timeStr = e.target.value;
        if (!timeStr) return;

        const [hours, minutes, seconds] = timeStr.split(":").map(Number);
        if ([hours, minutes, seconds].some((n) => isNaN(n))) return;

        // const currentDate = form.getValues("time") || new Date();

        // currentDate.setHours(hours, minutes, seconds, 0);
        // form.setValue("time", currentDate);
    };

    return (
        <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Event Time</FormLabel>

                    <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-12 sm:col-span-6">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className={cn(
                                                "pl-3 text-left font-normal w-full shadow-none",
                                                !field.value && "text-muted-foreground",
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        // selected={field.value}
                                        captionLayout="dropdown"
                                        onSelect={onDateChange}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <Input
                                type="time"
                                step="1"
                                defaultValue="10:30:00"
                                onChange={onTimeChange}
                                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                            />
                        </div>
                    </div>

                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
