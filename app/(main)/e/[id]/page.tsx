import { DateTab } from '@/components/core/date-tab';
import { EventImage } from '@/components/core/event-image';
import { GooglePlaceIFrame } from '@/components/core/google-place-iframe';
import { LocationTab } from '@/components/core/location-tab';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { UserDatabase } from '@/lib/database/db';
import { EventBucketService } from '@/lib/supabase/bucket-service';
import { cn } from '@/lib/utils';
import { Avatar } from '@radix-ui/react-avatar';
import Link from 'next/link';

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const bucket = new EventBucketService()
    bucket.init()       // Ceebs awaiting just let it init

    const db = new UserDatabase()
    const event = await db.getEventById(id)

    if (!event) {
        return <div>
            Invalid Event {id}
        </div>;
    }

    const user = await db.getUserById(event.creatorId)

    let imageUrl = ""
    if (event.imageId) {
        const { publicUrl } = await bucket.retrieve(event.imageId)
        imageUrl = publicUrl
    }

    console.log(event)
    return (
        <div className="flex items-center justify-center">
            <Card className="w-full max-w-5xl border-none shadow-none">
                <CardContent>
                    <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-12 md:col-span-5">
                            {imageUrl &&
                                <div className="flex items-center justify-center">
                                    <EventImage src={imageUrl} size={300} />
                                </div>}

                            {user &&
                                <div className="size-8 flex items-center space-x-2 ml-2 my-6">
                                    <Avatar>
                                        <AvatarImage src="" />
                                        <AvatarFallback>{user?.handler}</AvatarFallback>
                                    </Avatar>
                                    <Link
                                        href={`/u/${user.handler}`}
                                    >
                                        {user.handler}
                                    </Link>
                                </div>}

                            <div className="flex flex-col gap-2">
                                <DateTab date={new Date(event.startTime)} />
                                <LocationTab place={event.location} />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-7">
                            <div>
                                <div className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
                                    {event.title}
                                </div>

                                <div className="my-4">
                                    <div className="text-muted-foreground">About the Event</div>

                                    <div>
                                        {event.description}
                                    </div>
                                </div>

                                <GooglePlaceIFrame placeId={event.location.id} />

                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
