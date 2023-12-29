import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { LoaderComponent } from '@/components'
import { debounce } from 'lodash'
import DataTable, { TableColumn } from 'react-data-table-component'
import { FaSearch } from "react-icons/fa";
import moment from 'moment'
import 'moment/locale/id'

type DataRow = {
  id_transaksi: string,
  metode_pembayaran: string,
  status_transaksi: JSX.Element,
  total_pembayaran: number,
  created_at: string
}

export function Laporan() {
  const [search, setSearch] = useState('')

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

  const debounceSearch = debounce((e: any) => {
    setSearch(e.target.value)
  }, 1000)


  let searchList = useMemo(() => {
    return data?.filter((item: any) => {
      if (search === '') {
        return item
      }
      return item?.id_transaksi?.toLowerCase().includes(search.toLowerCase())
    })
  }, [search, data])

  return (
    <div className="h-screen w-screen overflow-auto p-5">
      <h1 className='font-bold text-4xl text-hacienda-900'>Laporan Transaksi</h1>
      {isLoading && <LoaderComponent />}
      <div className='flex justify-end items-center gap-3 mt-3'>
        <span className='text-2xl'><FaSearch /></span>
        <input onChange={e => debounceSearch(e)} className='border border-gray-400 rounded-full px-3 py-2 w-96 font-semibold' placeholder='Cari ID Transaksi' />
      </div>
      {
        data &&
        <DataTable
          data={searchList}
          columns={columns}
          pagination
        />
      }
    </div>
  )
}