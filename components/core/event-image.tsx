import { cn } from "@/lib/utils"

interface EventImageProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: number
    src: string
}

export function EventImage({ className, size = 400, src }: EventImageProps) {
    return (
        <div
            className={cn(className)}
            style={{
                width: size,
                height: size,
                overflow: 'hidden',
            }}
        >
            <img
                src={src}
                alt="event-image"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                }}
            />
        </div>
    )
}