import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "../types/database";

export async function middleware(req: NextRequest){
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  const { data: { user } } = await supabase.auth.getUser();
  // const { data: { session }, error } = await supabase.auth.getSession();

  //* Cek kondisi jika user login maka bisa akses ke menu utama
  if(user && req.nextUrl.pathname === '/login'){
    return NextResponse.redirect(new URL('/', req.url));
  }

  //* Cek kondisi jika user belum login maka tidak bisa akses ke menu utama dan akan diarahkan ke menu login
  if(!user && req.nextUrl.pathname !== '/login'){
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res
}

export const config = {
  matcher: ['/', '/login', '/transaksi', '/laporan']
}