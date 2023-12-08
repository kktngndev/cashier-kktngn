import { NextResponse } from "next/server";

export async function GET(){
  const balance = await fetch(`${process.env.NEXT_PUBLIC_FLIP_API_URL}/general/balance`,{
    headers: {
      'Authorization': `basic ${process.env.NEXT_PUBLIC_FLIP_API_SECRET} `
    }
  }).then(res => res.json())

  return NextResponse.json(balance);
}