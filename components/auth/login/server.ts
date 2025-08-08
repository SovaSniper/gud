'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { ONBOARDING_COOKIE_KEY } from '@/lib/supabase/utils/onboarding-cookie'

export async function login(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { data: user, error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    const userId = user.user.id
    console.log('Authenticated user ID:', userId)

    const { data: profile, error: dbError } = await supabase
        .from('user')
        .select('*')
        .eq('uuid', userId)
        .single()

    if (dbError) {
        console.error('Error fetching profile:', dbError)
        redirect('/error')
    }

    if (!profile) {
        console.error('USer not found')
        redirect('/error')
    }

    const cookieStore = await cookies()
    cookieStore.set(ONBOARDING_COOKIE_KEY, (profile.onboarded || false).toString(), {
        path: '/',
        // httpOnly: false,
        // secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    revalidatePath('/', 'layout')
    redirect('/home')
}
