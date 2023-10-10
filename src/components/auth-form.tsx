'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthForm() {
  const supabase = createClientComponentClient({ supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL, supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY })
  const router = useRouter()

  //* Get Auth State
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(e => {
      if (e === 'SIGNED_IN') {
        router.refresh()
        router.push('/')
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  })

  return (
    <Auth
      supabaseClient={supabase}
      view="sign_in"
      appearance={{ theme: ThemeSupa }}
      theme="light"
      showLinks={true}
      providers={[]}
      redirectTo="http://localhost:3000/auth/callback"

    />
  )
}