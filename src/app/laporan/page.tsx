'use client'
import { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Navbar } from '@/components/navbar'
import DataTable from 'react-data-table-component'

export default function Page() {
  const columns = useMemo(() => [], [])

  return (
    <div className='flex flex-1'>
      <Navbar />
      <div className="h-screen w-screen p-5">
        <h1 className='font-bold text-4xl text-hacienda-900'>Laporan Transaksi</h1>
        {/* <DataTable title='Transaksi' /> */}
      </div>
    </div>
  )
}
