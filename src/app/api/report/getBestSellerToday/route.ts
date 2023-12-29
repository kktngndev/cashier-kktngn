import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import moment from "moment";

export async function GET() {
  const { data, error } = await supabase.from('transaksi').select('daftar_transaksi, created_at').gte('created_at', moment().format('YYYY-MM-DD'));

  if (data) {
    const fixedData = data?.flatMap((item: any) => item.daftar_transaksi);

    const productQuantityMap: Record<string, number> = fixedData.reduce((acc, product) => {
      const { nama_produk, quantity } = product;
      acc[nama_produk] = (acc[nama_produk] || 0) + quantity;
      return acc;
    }, {});

    const bestSellers = Object.keys(productQuantityMap).map((nama_produk) => ({
      nama_produk,
      total_quantity: productQuantityMap[nama_produk],
    }));

    const sortedBestSellers = bestSellers.sort((a, b) => b.total_quantity - a.total_quantity);

    return NextResponse.json(sortedBestSellers.slice(0,5));
  }

  if (error) {
    return NextResponse.error();
  }
}