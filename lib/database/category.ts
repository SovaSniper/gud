import { Tables } from "./supabase";

export type CategoryCountEntity = Tables<"category_usage_view">
export type CategoryCountEntityResult = CategoryCountEntity[] | null

export type CategoryEntity = Tables<"category">

