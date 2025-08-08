import { DateTab } from '@/components/core/date-tab';
import { GooglePlaceIFrame } from '@/components/core/google-place-iframe';
import { LocationTab } from '@/components/core/location-tab';
import { GooglePlace } from '@/lib/google/places/api';
import { createClient } from '@/lib/supabase/server';

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const supabase = await createClient();

    const { id } = await params

    const listingId = Number(id);

    if (Number.isNaN(listingId)) {
        return (
            <div>
                Invalid parameter
            </div>
        )
    }

    // const bucket = new EventBucketService(supabase)

    const { data: listing, error: listingError } = await supabase
        .from("listing")
        .select(`
            *,
            user:userId (*),
            location:locationId (*)
        `)
        .eq("id", listingId)
        .single();

    if (listingError) {
        console.log(listingError)
        return <div>
            Invalid Event {id}
        </div>;
    }

    // let imageUrl = ""
    // if (event.imageId) {
    //     const { publicUrl } = await bucket.retrieve(event.imageId)
    //     imageUrl = publicUrl
    // }

    return (
        <div>
            <div>
                {JSON.stringify(listing)}
            </div>

            <div className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
                {listing.title}
            </div>

            <div className="my-4">
                <div className="text-muted-foreground">About the Event</div>

                <div>
                    {listing.description}
                </div>
            </div>

            <div>{listing.user.firstname}</div>
            <div className="flex flex-col gap-2">
                <DateTab date={new Date(listing.createdAt)} />
                <LocationTab place={listing.location.data as unknown as GooglePlace} />
            </div>
            <GooglePlaceIFrame placeId={listing.location.placeId} />

        </div>
        // <div className="flex items-center justify-center">
        //     <Card className="w-full max-w-5xl border-none shadow-none">
        //         <CardContent>
        //             <div className="grid grid-cols-12 gap-2">
        //                 <div className="col-span-12 md:col-span-5">
        //                     {imageUrl &&
        //                         <div className="flex items-center justify-center">
        //                             <EventImage src={imageUrl} size={300} />
        //                         </div>}

        //                     {user &&
        //                         <div className="size-8 flex items-center space-x-2 ml-2 my-6">
        //                             <Avatar>
        //                                 <AvatarImage src="" />
        //                                 <AvatarFallback>{user?.handler}</AvatarFallback>
        //                             </Avatar>
        //                             <Link
        //                                 href={`/u/${user.handler}`}
        //                             >
        //                                 {user.handler}
        //                             </Link>
        //                         </div>}

        //                     <div className="flex flex-col gap-2">
        //                         <DateTab date={new Date(event.startTime)} />
        //                         <LocationTab place={event.location} />
        //                     </div>
        //                 </div>
        //                 <div className="col-span-12 md:col-span-7">
        //                     <div>
        // <div className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
        //     {event.title}
        // </div>

        // <div className="my-4">
        //     <div className="text-muted-foreground">About the Event</div>

        //     <div>
        //         {event.description}
        //     </div>
        // </div>

        //                         <GooglePlaceIFrame placeId={event.location.id} />

        //                     </div>
        //                 </div>
        //             </div>
        //         </CardContent>
        //     </Card>
        // </div>
    );
}
