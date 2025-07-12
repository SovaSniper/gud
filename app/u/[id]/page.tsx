import { UserPage } from '@/components/u';
import { UserDatabase } from '@/lib/database/db';

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params
    const db = new UserDatabase()
    const user = await db.getUser(id)
    
    if (!user) {
        return <div>
            Invalid User {id}
        </div>;
    }

    const events = await db.getPublicEventsByCreator(user._id.toString())

    const publicUser = {
        ...user,
        events: events
    }

    // console.log(publicUser)
    return (
        <div className="flex items-center justify-center">
            <UserPage user={publicUser} />
        </div>
    );
}
