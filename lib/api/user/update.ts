import { GooglePlace } from "@/lib/google/places/api";
import { APIErrorResponse } from "../error";

export interface UserUpdateRequest {
  location: GooglePlace
}

export interface UserUpdateResponse {
  id: string;
}

export const userUpdate = async ({
  request,
  image
}: {
  request?: UserUpdateRequest,
  image?: File
}): Promise<UserUpdateResponse> => {
  const formData = new FormData()

  if (image) {
    formData.append('image', image)
  }

  formData.append('data', JSON.stringify(request))

  const response = await fetch(`/api/user/update`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const errorData: APIErrorResponse = await response.json();
    console.error("API error:", errorData.message);
    throw new Error(errorData.message);
  }

  return response.json()
}