import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();

  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore
  }, {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  const { id, status_transaksi, metode_pembayaran, total_pembayaran, daftar_transaksi } = await req.json();

  const { error, statusText, status } = await supabase.from('transaksi').upsert({
    id_transaksi: id,
    status_transaksi: status_transaksi,
    metode_pembayaran: metode_pembayaran,
    total_pembayaran: total_pembayaran,
    daftar_transaksi: daftar_transaksi ?? daftar_transaksi
  }).select();

  if (error) {
    return NextResponse.error();
  }

  if (statusText === 'Created') {
    return NextResponse.json({ message: 'Success' }, { status } );
  }
}