import React from 'react'

type Props = {
  classname: string
  text?: string
  text2?: string
  icon?: React.ReactNode
}

export default function CardComponent({ classname, text, text2, icon }: Props) {
  return (
    <div className={`w-72 h-48 p-5 rounded-2xl font-semibold flex flex-col justify-between items-start ${classname}`}>
      <div className='h-12 w-12 bg-white rounded-full flex justify-center items-center'>
        <div className='text-3xl text-hacienda-800'>
          { icon }
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <h2>{ text }</h2>
        <h1 className='text-3xl font-bold'>{ text2 }</h1>
      </div>
    </div>
  )
}
