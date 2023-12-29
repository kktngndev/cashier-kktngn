import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils";

export async function GET(req: NextRequest) {
  const idTrx = req.nextUrl.searchParams.get('id');

  if (!idTrx) {
    const { data: transaksi, error } = await supabase.from('transaksi').select('*').order('created_at', { ascending: false })

    if (transaksi) {
      return NextResponse.json(transaksi);
    }

    if (error) {
      throw new Error(error.message.toString());
    }
  }

  const { data: transaksi, error } = await supabase.from('transaksi').select('*').eq('id_transaksi', `${idTrx}`);

  if (transaksi) {
    return NextResponse.json(transaksi);
  }

  if (error) {
    throw new Error(error.message.toString());
  }

} 