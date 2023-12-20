import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";


export async function PUT(req: NextRequest) {
  try {
    const cookieStore = cookies();

    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore
    }, {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });

    const { id, daftar_transaksi } = await req.json();

    const { error, status } = await supabase.from('transaksi').update({
      daftar_transaksi: daftar_transaksi,
    }).match({ id_transaksi: id })

    if (error) {
      throw new Error(error.message.toString());
    }

    if (status) {
      return NextResponse.json({ message: 'Success' });
    }
  } catch (e: any) {
    console.error(e.message);
    return NextResponse.error();
  }
}