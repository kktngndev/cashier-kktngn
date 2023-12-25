import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const res = JSON.parse(`${data.getAll('data')}`);

    if (res.status === 'SUCCESSFUL') {
      const params = {
        id: res.sender_name,
        status_transaksi: res.status,
        metode_pembayaran: res.sender_bank,
        total_pembayaran: res.amount,
      }
      const addData = await fetch(`https://85sx9k0n-3000.asse.devtunnels.ms/api/transaction/create`, {
        method: 'POST',
        body: JSON.stringify(params),
      }).then(res => res.json());
      if (addData) {
        console.log('Data Added');
      }
      console.log('Payment Success');
      return NextResponse.json({ message: 'Payment Success' });
    } else if (res.status === 'PENDING') {
      console.log('Payment Pending');
      return NextResponse.json({ message: 'Payment Pending' });
    } else {
      throw new Error('Payment Failed');
    }
  } catch (e: any) {
    console.error(e.message);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}