import React from 'react'
import NavbarLink from './navbarLink'
import { MdHome } from 'react-icons/md'


export default function Navbar() {
  return (
    <nav className='h-screen flex flex-col items-center w-24 shadow-lg'>
      <NavbarLink icon={<MdHome/>} text='Home' link='/' />
      <NavbarLink icon={<MdHome/>} text='Transaksi' link='/auth' />
    </nav>
  )
}
