import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET(){
  const { data: kategori, error } = await supabase.from('kategori').select('id, nama_kategori');
  
  //* Cek jika data kategori berhasil diambil
  if(kategori){
    return NextResponse.json(kategori);
  }
  

  //* Cek jika ada error maka akan diarahkan ke menu utama
  if(error){
    return NextResponse.error();
  }
}