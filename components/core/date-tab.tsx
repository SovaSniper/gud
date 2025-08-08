"use client"

interface DateTabProps extends React.HTMLAttributes<HTMLDivElement> {
    date: Date
}

export function DateTab({ date }: DateTabProps) {
    const getMonthAbbr = (monthIndex: number): string => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[monthIndex] ?? '';
    };

    return (
        <div className="flex items-center gap-2">
            <div className="size-[50px] border rounded-lg text-center">
                <div className="bg-secondary text-xs font-semibold rounded-t-lg">
                    {getMonthAbbr(date.getMonth())}
                </div>
                <div className="flex items-center justify-center mt-1">
                    {date.getDay()}
                </div>
            </div>

            <div>
                {date.toDateString()}
            </div>
        </div>
    )
}