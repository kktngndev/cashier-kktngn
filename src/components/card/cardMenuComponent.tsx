'use client'
import React from 'react'

type Props = {
  name: string,
  price: number | string
}

export default function CardMenuComponent({ name, price }: Props) {
  const [count, setCount] = React.useState(0)

  const decrementCount = () => {
    if(count === 0){
      return setCount(0)
    }
    return setCount(count - 1)
  } 

  const incrementCount = () => {
    return setCount(count + 1)
  }

  return (
    <div className='w-64 h-56 p-3 rounded-xl border-2 flex items-start flex-col justify-between border-hacienda-900 bg-hacienda-100 shadow-lg'>
      <div>
        <h1 className='font-bold text-hacienda-950 text-2xl'>{ name }</h1>
        <h2 className='mt-3 font-semibold text-hacienda-800 text-xl'>Rp. { price }</h2>
      </div>
      <div className='flex mt-6 gap-4 relative bottom-0 justify-center items-center p-3 border-t border-hacienda-950 w-full'>
        <button className='flex items-center justify-center text-3xl bg-hacienda-950 p-3 text-white w-10 rounded h-10' onClick={decrementCount}>-</button>
        <div className='w-10 h-10 flex items-center justify-center border-hacienda-900 rounded bg-white border-2 font-bold'>{count}</div>
        <button className='flex items-center justify-center text-3xl bg-hacienda-950 p-3 text-white w-10 rounded h-10' onClick={incrementCount}>+</button>
      </div>
    </div>
  )
}
