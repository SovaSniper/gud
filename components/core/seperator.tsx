
interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    text?: string
}

export function Separator({ text }: SeparatorProps) {
    return (
        <div className="mb-6 mt-6 flex items-center justify-center" >
            <div
                aria-hidden="true"
                className="h-px w-full bg-secondary"
                data-orientation="horizontal"
                role="separator"
            />
            {text &&
                <span className="text-sm text-gray-9 font-semibold mx-4">{text}</span>}
            <div
                aria-hidden="true"
                className="h-px w-full bg-secondary"
                data-orientation="horizontal"
                role="separator"
            />
        </div >
    )
}
