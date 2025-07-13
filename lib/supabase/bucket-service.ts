import { cookies } from "next/headers";
import { createClient } from "./server";
import { SupabaseClient } from "@supabase/supabase-js";

export class EventBucketService {
    supabase?: SupabaseClient

    async init() {
        const cookieStore = cookies()
        this.supabase = await createClient(cookieStore)
    }

    async retrieve(id: string) {
        if (!this.supabase) {
            throw Error("Please Init service")
        }

        const { data } = this.supabase
            .storage
            .from('events')
            .getPublicUrl(id)

        return data;
    }

    async store(file: File, name?: string) {
        if (!this.supabase) {
            throw Error("Please Init service")
        }

        if (!name) {
            name = file.name;
        }

        const { data: image, error } = await this.supabase
            .storage
            .from('events')
            .upload(name, file, {
                cacheControl: '3600',
                upsert: false
            })

        return { image, error };
    }
}