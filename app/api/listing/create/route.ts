import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ListingCreateRequest } from "@/lib/api/listing/create";
import { ResponseError } from "@/lib/api/error";
import { Json } from "@/lib/database/supabase";

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
        return ResponseError({ message: "Authorised" });
    }

    if (!user?.id) {
        return ResponseError({ message: "Unknown User" });
    }

    const formData = await request.formData()
    const data: ListingCreateRequest = JSON.parse(formData.get('event') as string)
    const file = formData.get('image') as File
    if (file) {
        console.log("Uploading to storage...")
    }

    // If items, then create. Will be the first step to create. Will need to pass this Id when creating listing
    if (data.item) {
        const { data: createdItem, error: updateError } = await supabase
            .from("items")
            .insert({
                name: data.item.name,
                licenseRequired: data.item.license,
                condition: data.item.condition,
            })
            .select("id")
            .single();

        if (updateError) {
            console.log(updateError.message)
            return ResponseError({ message: "Database raised an error", status: 500 });
        }

        return NextResponse.json({ id: createdItem?.id })
    }

    if (data.listing) {
        const { data: listingId, error } = await supabase.rpc('create_full_listing', {
            p_location: data.listing.location as unknown as Json,
            p_place_id: data.listing.location.id,
            p_item_id: Number(data.listing.itemId),
            p_title: data.listing.title,
            p_description: data.listing.description,
            p_category_ids: data.listing.category.map(Number),
        });

        if (error) {
            console.log(error)
            return ResponseError({ message: "Database error", status: 500 });
        }

        return NextResponse.json({ id: listingId })
    }
}