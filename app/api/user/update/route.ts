import { ResponseError } from "@/lib/api/error";
import { UserUpdateRequest } from "@/lib/api/user/update";
import { Json } from "@/lib/database/supabase";
import { EventBucketService } from "@/lib/supabase/bucket-service";
import { createClient } from "@/lib/supabase/server";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    return ResponseError({ message: "Authorised" });
  }

  if (!user?.id) {
    return ResponseError({ message: "Unknown User" });
  }

  const userUpdate: { [key: string]: any } = {}

  const formData = await request.formData()
  const file = formData.get('image') as File
  if (file) {
    console.log("Uploading to storage...")
    const profilePath = `${user.id}.${getFileExtension(file)}`

    const storage = new EventBucketService(supabase);
    const { image: fileData, error: fileError } = await storage.update(file, profilePath)

    if (fileError) {
      console.log(fileError)
      return ResponseError({ message: "Failed to upload" });
    }

    userUpdate.profileURL = fileData!.path
  }

  const data: UserUpdateRequest = JSON.parse(formData.get('data') as string)
  console.log(data)

  if (data.location) {
    // Update the data in location
    const { data: locationData, error: locationError } = await supabase
      .from("location")
      .upsert({
        data: data.location as unknown as Json,
        placeId: data.location.id,
      }, {
        onConflict: "placeId", // conflict column must be unique
      })
      .select()
      .single();

    if (locationError) {
      console.log(locationError)
      return ResponseError({ message: "Failed to upload" });
    }

    userUpdate.locationId = locationData.id
  }

  if (Object.keys(userUpdate).length === 0) {
    return new Response("No update needed", { status: 500 });
  }

  const { error: updateError } = await supabase
    .from("user")
    .update(userUpdate)
    .eq("uuid", user.id);

  if (updateError) {
    console.error(updateError);
    return new Response("Failed to update user", { status: 500 });
  }

  return NextResponse.json({ id: "120" })
}

const getFileExtension = (file: File): string => {
  const parts = file.name.split('.')
  return parts.length > 1 ? parts.pop()?.toLowerCase() || "" : ""
}