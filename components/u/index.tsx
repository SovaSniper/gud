import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { PublicUser } from "@/lib/models/user-public"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

interface UserPageProps extends React.HTMLAttributes<HTMLDivElement> {
    user: PublicUser
}

export function UserPage({ user }: UserPageProps) {
    const formatted = user.createdAt.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    });

    return (
        <Card className="w-full max-w-xl border-none shadow-none">
            <CardContent>
                <div className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
                    {user.firstName} {user.surname}
                </div>

                <div>
                    Joined {formatted}
                </div>

                <div>Events</div>

                {user.events && user.events.map((event, index) => {
                    return (
                        <Card key={index}>
                            <CardContent>

                                <Sheet>
                                    <SheetTrigger>
                                        {event.sharableId}

                                        {event.title}
                                    </SheetTrigger>
                                    <SheetContent className="rounded-l-md">
                                        <SheetHeader>
                                            <SheetTitle></SheetTitle>

                                            <div>{event.title}</div>
                                            <div>{event.description}</div>

                                            <SheetDescription>
                                                {JSON.stringify(event.location)}
                                            </SheetDescription>

                                            <iframe
                                                className="rounded-lg"
                                                width="100%"
                                                height="256"
                                                loading="lazy"
                                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAbv-uq1vkLOYvQvxXB2VTwNjSFzEjlFuE&q=place_id:${event.location.id}&zoom=15`}>
                                            </iframe>

                                        </SheetHeader>
                                    </SheetContent>
                                </Sheet>
                            </CardContent>
                        </Card>
                    )
                })}
            </CardContent>
        </Card>
    )
}
