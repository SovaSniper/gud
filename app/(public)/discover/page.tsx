import { DiscoverPage } from '@/components/public/discover';
import { createClient } from '@/lib/supabase/server';

export default async function Page() {
  const supabase = await createClient()

  // TODO: Maybe Cache this somehow
  const { data: categoryCount, error: categoryCountError } = await supabase
    .from("category_usage_view")
    .select("*");

  console.log(categoryCount)

  return (
    <div>
      <DiscoverPage categoryCount={categoryCount} />
    </div>
  )
}