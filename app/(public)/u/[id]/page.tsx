import { createClient } from '@/lib/supabase/server';

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase
        .from("user")
        .select("*")
        .eq("uuid", id)
        .maybeSingle()

    if (!userError) {
        return <div>
            Invalid User {id}
        </div>;
    }

    console.log(userData)
    return (
        <div className="flex items-center justify-center">
            {JSON.stringify(userError)}
        </div>
    );
}
