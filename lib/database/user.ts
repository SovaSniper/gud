import { SupabaseClient } from "@supabase/supabase-js"
import { Database, Tables } from "./supabase"

export type UserEntity = Tables<"user">

export const getUserByUUID = async (supabase: SupabaseClient<Database>, uuid: string) => {
    return await supabase
        .from('user')
        .select('*')
        .eq('uuid', uuid)
        .single()
}