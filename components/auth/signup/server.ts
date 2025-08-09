"use server"

import { createClient } from '@/lib/supabase/server'
import { SignUpActions } from './enum'

interface SignUp {
    email: string,
    password: string,
}

export async function signup(request: SignUp): Promise<SignUpActions> {
    const supabase = await createClient()

    const data = request

    const { data: user, error } = await supabase.auth.signUp(data)

    if (error) {
        console.log("error")
        console.log(error)
        return SignUpActions.ERROR
    }

    if (!user.session)
        return SignUpActions.CONFIRM;

    return SignUpActions.DEFAULT;
}