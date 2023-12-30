import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils";


export async function PUT(req: NextRequest) {

  const { id, daftar_transaksi } = await req.json();

  const { error, status } = await supabase.from('transaksi').update({
    daftar_transaksi: daftar_transaksi,
  }).match({ id_transaksi: id })

  if (error) {
    return NextResponse.error();
  }

  if (status) {
    return NextResponse.json({ message: 'Success' });
  }
} 