import { EventImage } from '@/components/core/event-image';
import { GooglePlaceIFrame } from '@/components/core/google-place-iframe';
import { UserDatabase } from '@/lib/database/db';
import { EventBucketService } from '@/lib/supabase/bucket-service';

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

    let imageUrl = ""
    if (event.imageId) {
        const { publicUrl } = await bucket.retrieve(event.imageId)
        imageUrl = publicUrl
    }

    return (
        <div className="p-12">
            {/* <div>EVENT: {id}</div> */}

            {imageUrl &&
                <EventImage src={imageUrl} size={200} />}

            <div>
                <div className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
                    {event.title}
                </div>

                <div className="text-muted-foreground">About the Event</div>

                <div>
                    {event.description}
                </div>

                <div className="text-muted-foreground">Location</div>

                <div>{event.location.displayName.text}</div>
                <div>{event.location.formattedAddress}</div>

                <GooglePlaceIFrame placeId={event.location.id} />
            </div>
        </div>
    );
}
