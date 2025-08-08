import { ProfilePage } from '@/components/app/profile';

export default async function Page() {
    // const supabase = await createClient();
    // const { data } = await supabase.auth.getUser();
    // const user = data.user!;

    return (
        <div className="container">
            <ProfilePage />
        </div>
    );
}
