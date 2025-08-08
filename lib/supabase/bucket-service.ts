import { SupabaseClient } from "@supabase/supabase-js";

export class EventBucketService {
    supabase: SupabaseClient

    constructor(supabase: SupabaseClient) {
        this.supabase = supabase;
    }

    async retrieve(id: string) {
        const { data } = this.supabase
            .storage
            .from('events')
            .getPublicUrl(id)

        return data.publicUrl;
    }

    async store(file: File, name?: string) {
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

    async update(file: File, id: string) {
        const { data: image, error } = await this.supabase
            .storage
            .from('events')
            .update(id, file, {
                cacheControl: '3600',
                upsert: true
            })

        return { image, error };
    }
}