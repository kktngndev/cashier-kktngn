'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { Database } from "../../types/database"

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>({ supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL, supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY })

  return (
    <Auth
      supabaseClient={supabase}
      view="sign_in"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={true}
      providers={[]}
      redirectTo="http://localhost:3000/auth/callback"
    />
  )
}