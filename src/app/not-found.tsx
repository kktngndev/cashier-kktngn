import Link from "next/link";

import React from 'react'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center flex-col h-screen w-full">
      <h1 className="text-9xl font-bold">404</h1>
      <h2 className="text-4xl font-bold">Halaman tidak ditemukan</h2>
      <Link href="/">
        <div className="text-2xl font-bold text-hacienda-500 hover:text-hacienda-700">Kembali ke halaman utama</div>
      </Link>
    </div>
  )
}
