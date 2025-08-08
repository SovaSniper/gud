import { PageCreate } from '@/components/pages/create';
import { CreateListingProvider } from '@/components/pages/create/provider';
import { getDraftedItems } from '@/lib/database/items';
import { createClient } from '@/lib/supabase/server';

export default async function Page() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const user = data.user!;

    const { data: items, error: dbError } = await getDraftedItems(supabase, user.id);

    return (
        <CreateListingProvider>
            <PageCreate existingItems={items || []} />
        </CreateListingProvider>
    )
}
