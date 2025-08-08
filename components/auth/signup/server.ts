"use server"

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

interface SignUp {
    email: string,
    password: string,
}

export async function signup(request: SignUp) {
    const supabase = await createClient()

    const data = request

    const { data: user, error } = await supabase.auth.signUp(data)

    if (error) {
        console.log("error")
        console.log(error)
        redirect('/error')
    }

    if (!user.session) {
        redirect('/confirm')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}