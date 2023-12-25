'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavbarLinkProps = {
  handleClick?: () => void
  text?: string
  icon?: React.ReactNode
  link: string
}

export function NavbarLink({ handleClick, text, icon, link }: NavbarLinkProps) {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    pathname === link ? setIsActive(true) : setIsActive(false);
  }, [pathname, link])

  return (
    <button onClick={handleClick}>
      <Link href={link} className={`${isActive ? `bg-hacienda-100 border-hacienda-500`: `border-hacienda-300`} h-24 w-24 flex flex-col items-center justify-center rounded-xl text-sm text-hacienda-900 font-semibold border-2 hover:bg-hacienda-800 hover:text-hacienda-50 transition-all`}>
        <div className='text-3xl'>
          {icon}
        </div>
        {text}
      </Link>
    </button>
  )
}
