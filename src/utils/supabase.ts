import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../types/database'
import { cookies } from 'next/headers'

// export const supabase = createClient<Database>(`${process.env.NEXT_PUBLIC_SUPABASE_URL}`,`${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`)
export const supabase = createRouteHandlerClient<Database>({ cookies: () => cookies() },{ supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL, supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY})

