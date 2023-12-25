import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import moment from "moment";


export async function GET() {
  const { error, count, data: transaksi } = await supabase.from('transaksi').select(`
    total_pembayaran
  `, { count: 'exact' }).gte('created_at', moment().format('YYYY-MM-DD'));

  if (count !== null && transaksi) {

    return NextResponse.json({
      data: transaksi,
      total: count
    });
  }

  if (error) {
    return NextResponse.error();
  }
}