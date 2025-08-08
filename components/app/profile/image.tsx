"use client"

import { EventImage } from "@/components/core/event-image";
import { Input } from "@/components/ui/input";
import { userUpdate } from "@/lib/api/user/update";
import { ChangeEvent, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Pencil } from "lucide-react";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { file: files[0], displayUrl };
}

export interface ProfileImageProps extends React.HTMLAttributes<HTMLImageElement> {
  src?: string
}

export function ProfileImage({ src, ...props }: ProfileImageProps) {
  const [preview, setPreview] = useState("");

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await userUpdate({
        image: event.target.files![0]
      })

      console.log(response)

      if (!response.id) {
        throw Error("Failed to Uplaod")
      }
      const { displayUrl } = getImageData(event)
      setPreview(displayUrl);
    } catch (e: any) {
      console.log("error", e.message)
    }
  }

  return (
    <div className="relative inline-block">
      <Avatar className="rounded-lg size-32">
        <AvatarImage
          src={preview || src}
          alt="profile"
          {...props}
        />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      <label
        htmlFor="avatar-upload"
        className="absolute bottom-0 right-0 bg-transparent bg-white rounded-full p-1 cursor-pointer hover:bg-gray-100 p-2"
      >
        <Pencil size={24} className="text-gray-700" />
      </label>

      <Input
        id="avatar-upload"
        type="file"
        accept="image/png, image/jpeg"
        onChange={onChange}
        className="hidden"
      />
    </div>
  )
}
