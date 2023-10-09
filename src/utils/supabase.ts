import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../types/database";


export default function Supabase() {
  const cookiesStore = cookies();
  const supabase = createServerComponentClient<Database>({ cookies: () => cookiesStore });
  
  return supabase;
}