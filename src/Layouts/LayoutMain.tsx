import React from 'react'
import { Sidebar, Header } from '../defaultPath'
import { Player } from '~/components/Player/Player'
interface Props {
  children: React.ReactNode
}
export const LayoutMain = ({ children }: Props) => {
  return (
    <div className='w-full grid grid-cols-12 relative '>
      <div className='col-span-2'>
        <Sidebar />
      </div>
      <div className='col-span-10 w-full'>
        <Header />
        <div>{children}</div>
      </div>
       <div className=' bottom-0 w-full fixed'><Player /> </div>
    </div>
  )
}
