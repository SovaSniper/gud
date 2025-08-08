import { createClient } from "@/lib/supabase/client"

export const signOut = async () => {
    const supabase = createClient()

    // Sign out the user
    const { error } = await supabase.auth.signOut()

    if (error) {
        console.error('Error signing out:', error.message)
    } else {
        console.log('Signed out successfully')
        window.location.href = "/"
    }
}