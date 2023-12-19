import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
  const { amount, title, name } = await req.json();

  const createQRIS = await fetch(`${process.env.FLIP_API_URL}/pwf/bill`, {
    headers: {
      'Authorization' : `basic ${btoa(`${process.env.FLIP_API_SECRET?.toString()}`)}`,
      'Content-Type' : 'application/json',
      
    },
    method: 'POST',
    body: JSON.stringify({
      amount,
      title,
      'type': 'SINGLE',
      'sender_name': name,
      'sender_email': 'customer@kakitangan.biz.id',
      'sender_bank': 'qris',
      'sender_bank_type': 'wallet_account',
      'step': '3',
    })
  }).then(res => res.json())

  return NextResponse.json(createQRIS);
}