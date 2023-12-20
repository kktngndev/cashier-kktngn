import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();

    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore
    }, {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });

    const { id, status_transaksi, metode_pembayaran, total_pembayaran } = await req.json();

    const { error, status } = await supabase.from('transaksi').insert({
      id_transaksi: id,
      status_transaksi: status_transaksi,
      metode_pembayaran: metode_pembayaran,
      total_pembayaran: total_pembayaran,
    })

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