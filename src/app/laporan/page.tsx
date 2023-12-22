'use client'
import { useState, useEffect, useMemo, ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { LoaderComponent, Navbar } from '@/components'
import DataTable, { TableColumn } from 'react-data-table-component'
import moment from 'moment'
import 'moment/locale/id'

type DataRow = {
  id_transaksi: string,
  metode_pembayaran: string,
  status_transaksi:  JSX.Element,
  total_pembayaran: number,
  created_at: string
}

export default function Page() {

  const { data, isLoading } = useQuery({
    queryKey: ['transaksi'],
    queryFn: async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/transaction`)
      return data.json()
    },
  })

  const columns: TableColumn<DataRow>[] = useMemo(() => [
    {
      name: 'ID Transaksi',
      sortable: true,
      selector: (row: { id_transaksi: any }) => row.id_transaksi,
    },
    {
      name: 'Metode Pembayaran',
      sortable: true,
      selector: (row: { metode_pembayaran: any }) => String(row.metode_pembayaran).toUpperCase()
    },
    {
      name: 'Status',
      sortable: true,
      cell: (row: { status_transaksi: any }) => <span className={`rounded-full text-base px-2.5 py-0.5 ${row.status_transaksi === 'SUCCESSFUL' ? 'bg-green-700 text-green-200' : 'bg-yellow-700 text-yellow-200'}`}>{row.status_transaksi}</span>,
      ignoreRowClick: true,
    },
    {
      name: 'Total Pembayaran',
      sortable: true,
      selector: (row: { total_pembayaran: any }) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.total_pembayaran)
    },
    {
      name: 'Tanggal Transaksi',
      sortable: true,
      selector: (row: { created_at: any }) => moment(row.created_at).format('DD MMMM YYYY')
    }
  ], [])

  return (
    <div className='flex flex-1'>
      <Navbar />
      <div className="h-screen w-screen p-5">
        <h1 className='font-bold text-4xl text-hacienda-900'>Laporan Transaksi</h1>
        {isLoading && <LoaderComponent />}
        {
          data &&
          <DataTable
            data={data}
            columns={columns}
            pagination
          />
        }
      </div>
    </div>
  )
}