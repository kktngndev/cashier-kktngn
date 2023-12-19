import React from 'react'
import { NavbarLink } from '.'
import { MdHome, MdPayments, MdPieChart, MdPowerSettingsNew } from 'react-icons/md'


export function Navbar() {
  return (
    <nav className='h-screen sticky w-32 shadow-lg flex flex-col justify-between'>
      <div className='flex flex-col gap-6 mt-3 items-center'>
        <NavbarLink icon={<MdHome />} text='Home' link='/' />
        <NavbarLink icon={<MdPayments />} text='Transaksi' link='/transaksi' />
        <NavbarLink icon={<MdPieChart />} text='Laporan' link='/laporan' />
      </div>
      <div className='flex flex-col gap-6 mb-3 items-center'>
        <NavbarLink icon={<MdPowerSettingsNew />} text='Keluar' link='/auth/signout' />
      </div>
    </nav>
  )
}
