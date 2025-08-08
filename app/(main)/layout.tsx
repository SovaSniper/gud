import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner"
import { cookies } from "next/headers";
import { ONBOARDING_COOKIE_KEY } from "@/lib/supabase/utils/onboarding-cookie";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app/sidebar";
import { AppProvider } from "@/components/app/provider";
import { createClient } from "@/lib/supabase/server";
import { ErrorPage } from "@/components/core/error-page";
import { GooglePlace } from "@/lib/google/places/api";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import "../globals.css";
import { UserEntity } from "@/lib/database/user";
import { EventBucketService } from "@/lib/supabase/bucket-service";

export const metadata: Metadata = {
  title: "BBM",
  description: "BBM Event",
};


export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    return <ErrorPage text="Error getting user" />
  }

  if (!user) {
    return <ErrorPage text="Session may be expired" />
  }

  const cookieStore = await cookies();
  const onboarding = cookieStore.get(ONBOARDING_COOKIE_KEY)?.value === "true"

  if (!onboarding) {
    console.log("User has not onboarded")
    redirect('/onboarding')
  }

  const { data: userData, error: userError } = await supabase
    .from("user")
    .select(`
      *,
        location (*)
    `)
    .single()

  if (userError) {
    return <ErrorPage text="Error getting profile" />
  }

  let userLocation: GooglePlace | undefined;
  if (userData?.location?.data) {
    userLocation = userData?.location?.data as unknown as GooglePlace
  }

  let profileUrl: string | undefined;
  if (userData.profileURL) {
    const storage = new EventBucketService(supabase);
    profileUrl = await storage.retrieve(userData.profileURL);
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AppProvider
        initLocationPreference={userLocation}
        initUser={userData as UserEntity}
        initUseUrl={profileUrl}

      >
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
          <Toaster />
        </SidebarProvider>
      </AppProvider>
    </ThemeProvider>
  );
}
