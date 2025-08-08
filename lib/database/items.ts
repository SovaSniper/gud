import { SupabaseClient } from "@supabase/supabase-js"
import { Database, Tables,  } from "./supabase"

export type ItemsEntity = Tables<"items">

export const getDraftedItems = async (supabase: SupabaseClient<Database>, uuid: string) => {
    return await supabase
        .from('items')
        .select('*')
        .eq('userId', uuid)

}