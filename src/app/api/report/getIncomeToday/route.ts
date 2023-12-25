import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import  moment from "moment";

export async function GET(){
  const { data: transaksi, error } = await supabase.from('transaksi').select(' total_pembayaran' , { count: 'exact' }).gte('created_at', moment().format('YYYY-MM-DD'));

  const sum = transaksi?.reduce((a, b) => a + (b['total_pembayaran'] || 0), 0);
  
  if(transaksi){
    return NextResponse.json({
      total_income: sum
    });
  }
  
  if(error){
    return NextResponse.error();
  }
}