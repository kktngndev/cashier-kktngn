import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const res = JSON.parse(`${data.getAll('data')}`);

    if (res.status === 'SUCCESSFUL') {
      console.log('Payment Success');
      return NextResponse.json({ message: 'Payment Success' });
    }else if(res.status === 'PENDING'){
      console.log('Payment Pending');
      return NextResponse.json({ message: 'Payment Pending' });
    }
    console.log('Payment Failed');
    return NextResponse.json({ message: 'Payment Failed' }, { status: 500 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}