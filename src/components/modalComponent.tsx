import { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

export default function ModalComponent({ children }: Props) {
  return (
    <div id='modal' className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center'>
      {children}
    </div>
  )
}
