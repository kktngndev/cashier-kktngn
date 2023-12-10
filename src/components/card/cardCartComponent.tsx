import { useCallback, useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { cartItemAtom, cartTotalAtom} from '../../../atoms/cartAtom'

type Props = {
  item: { nama_produk: string, harga_produk: number }
}

export default function CardCartComponent({ item }: Props) {
  const [cartItem, setCartItem] = useRecoilState(cartItemAtom) as any[]
  const [total, setTotal] = useRecoilState(cartTotalAtom)
  const cartIndex = cartItem.findIndex((cart: any) => cart.nama_produk === item.nama_produk)
  const [quantity, setQuantity] = useState(cartIndex !== -1 ? cartItem[cartIndex].quantity : 1)

  const removeItemFromCart = (cart: [], index: number) => {
    return [...cart.slice(0, index), ...cart.slice(index + 1)]
  }

  const updateQuantity = useCallback((productName: string, newQuantity: number) => {
    const newCart = [...cartItem]
    const index = newCart.findIndex((cart: {nama_produk: string}) => cart.nama_produk === productName)

    if(index !== -1){
      newCart[index] = {...newCart[index], quantity: newQuantity}
      setCartItem(newCart)
      setQuantity(newQuantity)
    }
    return newCart
  }, [cartItem, setCartItem]) 

  const handleIncrement = () => {
    const newCart = updateQuantity(item.nama_produk, quantity + 1)
    setTotal((prevTotal: any) => (prevTotal + item.harga_produk))
    setCartItem(newCart)
  }

  const handleDecrement = () => {
    updateQuantity(item.nama_produk, quantity - 1)
    if (cartItem[cartIndex].quantity <= 1) {
      const newCart = removeItemFromCart(cartItem, cartIndex)
      setCartItem(newCart)
    }
    setTotal((prevTotal: any) => (prevTotal - item.harga_produk))
  }

  useEffect(() => {
    if (cartIndex !== -1) {
      setQuantity(cartItem[cartIndex].quantity)
    }
  },[cartItem, cartIndex])

  return (
    <div className='grid grid-cols-2 border-t border-b p-3 border-hacienda-800 font-semibold text-xl gap-16'>
      {item.nama_produk}
      <div className='flex justify-between items-center'>
        <button className='w-8 h-8 bg-hacienda-950 rounded-xl text-white font-bold border-2 border-hacienda-800 transition hover:bg-hacienda-600' onClick={handleDecrement}>
          -
        </button>
        <p className='text-hacienda-950'>{quantity}</p>
        <button className='w-8 h-8 bg-hacienda-950 rounded-xl text-white font-bold border-2 border-hacienda-800 transition hover:bg-hacienda-600' onClick={handleIncrement}>
          +
        </button>
      </div>
    </div>
  )
}
