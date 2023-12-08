import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET(){
  const { data: produk, error } = await supabase.from('produk').select('nama_produk, harga_produk, keterangan_produk, kategori (nama_kategori)');
  
  //* Cek jika data produk berhasil diambil
  if(produk){
    return NextResponse.json(produk);
  }
  

  //* Cek jika ada error maka akan diarahkan ke menu utama
  if(error){
    return NextResponse.error();
  }
}