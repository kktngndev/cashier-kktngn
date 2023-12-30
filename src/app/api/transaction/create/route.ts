import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils";

export async function POST(req: NextRequest) {
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