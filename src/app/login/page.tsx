import AuthForm from "@/components/auth-form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore }, {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_SERVICE_KEY,
  })

  //* Get session 
  const { data: { session } } = await supabase.auth.getSession()

  if (session) return 

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="w-96 h-fit">
        <AuthForm />
      </div>
    </div>
  )
}