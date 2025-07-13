import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid"
import { EventCreateRequest, EventCreateResponse } from "@/lib/api/event/create";
import { UserDatabase } from "@/lib/database/db";
import { Event } from "@/lib/models/event";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { APIErrorResponse } from "@/lib/api/error";
import { EventBucketService } from "@/lib/supabase/bucket-service";

function getFileExtension(file: File): string | null {
    const parts = file.name.split('.')
    return parts.length > 1 ? parts.pop()?.toLowerCase() || null : null
}

export async function POST(request: NextRequest): Promise<NextResponse<EventCreateResponse | APIErrorResponse>> {
    const formData = await request.formData()

    const jsonString = formData.get('event') as string
    const eventRequest: EventCreateRequest = JSON.parse(jsonString)
    // console.log(eventRequest)

    const file = formData.get('image') as File
    // console.log(file)

    const sharableId = nanoid(10)

    const bucket = new EventBucketService()
    await bucket.init()

    const { image, error } = await bucket.store(file, `${sharableId}.${getFileExtension(file)}`)
    if (error) {
        console.warn(`Failed to upload file for ${sharableId} ${error.message}`)
    }

    const data = await getServerSession(authOptions);
    if (!data?.user.id) {
        return NextResponse.json({ message: "Something went wrong. Id not found" }, { status: 500 })
    }

    const event: Event = {
        sharableId,
        creatorId: data?.user.id,
        title: eventRequest.title,
        description: eventRequest.description,
        location: eventRequest.location,
        startTime: eventRequest.time,
        visibility: eventRequest.visibility,
        createdAt: new Date(),
    }

    if (image?.id) {
        event.imageId = image.path
    }

    const db = new UserDatabase()
    const objId = await db.storeEvent(event)

    console.log(objId)
    console.log(sharableId)

    return NextResponse.json({ id: sharableId })
}