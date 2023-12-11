import { NextResponse } from "next/server";

export async function GET(){
  const balance = await fetch(`${process.env.NEXT_PUBLIC_FLIP_API_URL}/general/balance`,{
    headers: {
      'Authorization': `basic ${btoa(`${process.env.NEXT_PUBLIC_FLIP_API_SECRET?.toString()}`)}`
    }
  }).then(res => res.json())

  return NextResponse.json(balance);
}