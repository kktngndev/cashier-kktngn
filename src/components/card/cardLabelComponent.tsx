'use client'
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

type Props = {
  name: string
  isDefault?: boolean
}

export default function CardLabelComponent({ name, isDefault }: Props) {
  const params = useSearchParams()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if(params.get('kategori') === name && params.has('kategori')){
      setIsActive(true)
    }else{
      setIsActive(false)
    }
  },[params, name, isDefault])

  return (
    <div className={`flex items-center justify-center h-12 w-24 border-2 rounded-2xl border-hacienda-950 ${isActive || isDefault ? 'bg-hacienda-600' : 'bg-hacienda-200'} hover:bg-hacienda-700 transition-all text-hacienda-950 hover:text-white`}>
      <p className="text-sm font-bold ">{ name }</p>
    </div>
  )
}
