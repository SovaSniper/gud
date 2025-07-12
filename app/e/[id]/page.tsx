import { UserPage } from '@/components/u';
import { UserDatabase } from '@/lib/database/db';

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params

    return (
        <div className="flex items-center justify-center">
            EVENT:
            {id}
        </div>
    );
}
