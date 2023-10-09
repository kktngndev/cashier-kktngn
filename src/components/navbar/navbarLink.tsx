'use client'
import React, { useState } from 'react'
import Link from 'next/link'

type NavbarLinkProps = {
  handleClick?: () => void
  text?: string
  icon?: React.ReactNode
  link : string
}

export default function NavbarLink({ handleClick, text, icon, link }: NavbarLinkProps) {
  const [isActive, setIsActive] = useState(false)

  return (
    <button onClick={handleClick}>
      <Link href={ link } className='h-16 w-16 flex flex-col mt-3 items-center justify-center rounded-lg text-xs bg-hacienda-100'>
        <div className='text-xl'>
          {icon}
        </div>
        {text}
      </Link>
    </button>
  )
}
