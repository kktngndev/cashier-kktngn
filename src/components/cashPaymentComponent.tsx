'use client'
import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { cartTotalAtom } from '../../atoms/cartAtom'

type Props = {
  onClick: () => void
}

export function CashPaymentComponent({ onClick }: Props) {
  const total = useRecoilValue(cartTotalAtom)
  const [cash, setCash] = useState(0)
  const [change, setChange] = useState(0)

  const handleCash = (e: any) => {
    cash > 0 ? setChange(cash - total) : setChange(0)
    if (e.target.value === 'AC') {
      setCash(0)
    } else if (e.target.value === '000') {
      if (cash === 0) return
      else setCash(cash * 1000)
    } else {
      setCash(parseInt(cash + e.target.value))
    }
  }

  useEffect(() => {
    cash > 0 ? setChange(cash - total) : setChange(0)
  },[cash, total])

  return (
    <div className='h-[90%] w-[90%] bg-white relative grid grid-cols-2'>
      <button className='absolute top-6 right-12 text-3xl font-bold h-10 w-10 rounded-xl shadow text-hacienda-950 bg-hacienda-500 hover:bg-hacienda-700 transition-colors' onClick={onClick}>X</button>
      <div className='p-7 flex flex-col gap-5'>
        <h1 className='text-3xl font-bold'>Total Pembayaran Tunai</h1>
        <div className='flex font-semibold items-center justify-between'>
          <p className='text-2xl'>Yang harus dibayar:</p>
          <p className='text-3xl'>Rp. {total}</p>
        </div>
        <div className='flex font-semibold items-center justify-between'>
          <p className='text-2xl'>Terbayar:</p>
          <p className='text-3xl'>Rp. {cash}</p>
        </div>
        <div className='border-t border-hacienda-900 py-5 flex items-center justify-between'>
          <p className='text-2xl font-semibold'>Kembali:</p>
          <p className='text-3xl'>Rp. {change}</p>
        </div>
        <button className='w-full h-16 bg-hacienda-700 rounded-xl shadow-xl font-bold text-white border-2 border-hacienda-500 transition-colors hover:bg-hacienda-600 hover:text-hacienda-950'>Submit</button>
      </div>
      <div className='bg-hacienda-200 p-7'>
        <div className=' mt-6 flex flex-col gap-8 items-center justify-center'>
          <div className='flex gap-5'>
            <button className='h-16 w-24 bg-hacienda-700 rounded-xl shadow-xl border-2 border-hacienda-400 text-3xl font-semibold transition hover:bg-hacienda-800 hover:text-white' value={10000} onClick={(e: any) => setCash(e.target.value)}>10K</button>
            <button className='h-16 w-24 bg-hacienda-700 rounded-xl shadow-xl border-2 border-hacienda-400 text-3xl font-semibold transition hover:bg-hacienda-800 hover:text-white' value={20000} onClick={(e: any) => setCash(e.target.value)}>20K</button>
            <button className='h-16 w-24 bg-hacienda-700 rounded-xl shadow-xl border-2 border-hacienda-400 text-3xl font-semibold transition hover:bg-hacienda-800 hover:text-white' value={50000} onClick={(e: any) => setCash(e.target.value)}>50K</button>
            <button className='h-16 w-24 bg-hacienda-700 rounded-xl shadow-xl border-2 border-hacienda-400 text-3xl font-semibold transition hover:bg-hacienda-800 hover:text-white' value={100000} onClick={(e: any) => setCash(e.target.value)}>100K</button>
          </div>
          <div className='grid grid-cols-3 gap-12 mt-3 font-bold text-3xl'>
            <button className='bg-hacienda-700 p-4 rounded-xl shadow-xl border-2 border-hacienda-400 transition hover:bg-hacienda-800 hover:text-white' value={1} onClick={(e: any) => handleCash(e)}>1</button>
            <button className='bg-hacienda-700 p-4 rounded-xl shadow-xl border-2 border-hacienda-400 transition hover:bg-hacienda-800 hover:text-white' value={2} onClick={(e: any) => handleCash(e)}>2</button>
            <button className='bg-hacienda-700 p-4 rounded-xl shadow-xl border-2 border-hacienda-400 transition hover:bg-hacienda-800 hover:text-white' value={3} onClick={(e: any) => handleCash(e)}>3</button>
            <button className='bg-hacienda-700 p-4 rounded-xl shadow-xl border-2 border-hacienda-400 transition hover:bg-hacienda-800 hover:text-white' value={4} onClick={(e: any) => handleCash(e)}>4</button>
            <button className='bg-hacienda-700 p-4 rounded-xl shadow-xl border-2 border-hacienda-400 transition hover:bg-hacienda-800 hover:text-white' value={5} onClick={(e: any) => handleCash(e)}>5</button>
            <button className='bg-hacienda-700 p-4 rounded-xl shadow-xl border-2 border-hacienda-400 transition hover:bg-hacienda-800 hover:text-white' value={6} onClick={(e: any) => handleCash(e)}>6</button>
            <button className='bg-hacienda-700 p-4 rounded-xl shadow-xl border-2 border-hacienda-400 transition hover:bg-hacienda-800 hover:text-white' value={7} onClick={(e: any) => handleCash(e)}>7</button>
            <button className='bg-hacienda-700 p-4 rounded-xl shadow-xl border-2 border-hacienda-400 transition hover:bg-hacienda-800 hover:text-white' value={8} onClick={(e: any) => handleCash(e)}>8</button>
            <button className='bg-hacienda-700 p-4 rounded-xl shadow-xl border-2 border-hacienda-400 transition hover:bg-hacienda-800 hover:text-white' value={9} onClick={(e: any) => handleCash(e)}>9</button>
            <button className='bg-hacienda-700 p-4 rounded-xl shadow-xl border-2 border-hacienda-400 transition hover:bg-hacienda-800 hover:text-white' value={0} onClick={(e: any) => handleCash(e)}>0</button>
            <button className='bg-hacienda-700 p-4 rounded-xl shadow-xl border-2 border-hacienda-400 transition hover:bg-hacienda-800 hover:text-white' value={'000'} onClick={(e: any) => handleCash(e)}>000</button>
            <button className='bg-hacienda-700 p-4 rounded-xl shadow-xl border-2 border-hacienda-400 transition hover:bg-hacienda-800 hover:text-white' value={'AC'} onClick={(e: any) => handleCash(e)}>AC</button>
          </div>
        </div>
      </div>
    </div>
  )
}
