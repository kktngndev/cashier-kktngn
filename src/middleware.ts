import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import { NextRequest } from "next/server";

export async function middleware(req: NextRequest){
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data: { user } } = await supabase.auth.getUser();

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
  matcher: ['/', '/login']
}