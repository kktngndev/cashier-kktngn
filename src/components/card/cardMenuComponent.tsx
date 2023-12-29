'use client'
import { useCallback } from "react"
import { useRecoilState } from "recoil"
import { useState } from "react"
import { cartItemAtom, cartTotalAtom } from "@atoms/index"

type Props = {
  name: string,
  price: number | string
}

export function CardMenuComponent({ name, price }: Props) {
  const [cartItem, setCartItem] = useRecoilState(cartItemAtom) as any[]
  const cartIndex = cartItem.findIndex((cart: any) => cart.nama_produk === name)
  const [isAdded, setIsAdded] = useState(false)
  const [total, setTotal] = useRecoilState(cartTotalAtom)

  const addToCart = useCallback(() => {
    if (cartIndex === -1) {
      setCartItem((prevItem: any) => [...prevItem, { nama_produk: name, harga_produk: price, quantity: 1, isAdded: true }])
      setTotal((prevTotal: any) => (parseInt(prevTotal) + parseInt(price.toString())))
      setIsAdded(!isAdded)
    } else {
      const newCart = [...cartItem]
      newCart[cartIndex].quantity++
      setCartItem(newCart)
      setTotal((prevTotal: any) => (prevTotal + price))
      setIsAdded(!isAdded)
    }
  }, [cartItem, cartIndex, isAdded, name, price, setCartItem, setTotal])

  const isAddedToCart = cartItem.some((item: any) => item.nama_produk === name)

  return (
    <div id={name} className={`w-64 h-56 p-3 rounded-xl border-2 flex items-start flex-col justify-between border-hacienda-900 shadow-lg bg-hacienda-100`}>
      <div>
        <h1 className='font-bold text-hacienda-950 text-2xl'>{name}</h1>
        <h2 className='mt-3 font-semibold text-hacienda-800 text-xl'>Rp. {price}</h2>
      </div>
      <div className='flex mt-6 gap-4 relative bottom-0 justify-center items-center p-3 border-t border-hacienda-950 w-full'>
        {
          isAddedToCart ? (
            <button disabled className='w-48 h-10 rounded-xl text-white font-bold border-2 border-hacienda-800 transition bg-hacienda-600'>
              &#10004; Tambah
            </button>
          ) : (
            <button className='w-48 h-10 bg-hacienda-950 rounded-xl text-white font-bold border-2 border-hacienda-800 transition hover:bg-hacienda-600' onClick={addToCart}>
              + Tambah
            </button>
          )
        }
      </div>
    </div>
  )
}
