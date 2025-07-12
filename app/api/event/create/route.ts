import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid"
import { EventCreateRequest, EventCreateResponse } from "@/lib/api/event/create";
import { UserDatabase } from "@/lib/database/db";
import { Event } from "@/lib/models/event";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getToken } from "next-auth/jwt";
import { APIErrorResponse } from "@/lib/api/error";

export async function POST(request: NextRequest): Promise<NextResponse<EventCreateResponse | APIErrorResponse>> {
    const eventRequest: EventCreateRequest = await request.json()

    const data = await getServerSession(authOptions);
    console.log("session")
    console.log(data)

    if (!data?.user.id) {
        return NextResponse.json({ message: "Something went wrong. Id not found" }, { status: 500 })
    }

    const sharableId = nanoid(10)
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

    const db = new UserDatabase()
    const objId = await db.storeEvent(event)

    console.log(objId)
    console.log(sharableId)

    return NextResponse.json({ id: sharableId })
}