'use client'
import React from 'react'
import CardMenuComponent from '../card/cardMenuComponent'

export default function ListCardCategoriesTrxComponent() {
  const [menu, setMenu] = React.useState([])

  React.useEffect(() => {

    async function getData(){
      const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getProdukData`).then(res => res.json())
      setMenu(data)
      console.log(data);
    }
    getData()
  }, [])

  return (
    <div className='p-2 mt-4 grid grid-cols-3 justify-items-center gap-6'>
      {
        menu ? (
          menu.map((item: { nama_produk: string, harga_produk: number, id: number }, index) => (
            <CardMenuComponent key={ index } name={ item.nama_produk } price={ item.harga_produk } />
          ))
        ) : null
      }
    </div>
  )
}
