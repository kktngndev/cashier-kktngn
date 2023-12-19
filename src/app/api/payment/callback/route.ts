import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const res = JSON.parse(`${data.getAll('data')}`);
    console.log(res);

    if (res.status === 'SUCCESSFUL') {
      const { data: transaksi, error } = await supabase.from('transaksi').insert([
        
      ])
      console.log('Payment Success');
      return NextResponse.json({ message: 'Payment Success' });
    }else if(res.status === 'PENDING'){
      console.log('Payment Pending');
      return NextResponse.json({ message: 'Payment Pending' });
    }else {
      throw new Error('Payment Failed');
    }
  } catch (e: any) {
    console.error(e.message);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}