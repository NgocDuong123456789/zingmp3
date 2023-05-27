import React from 'react'
interface Props{
  children: React.ReactNode
}
export const LayoutMain = ({children}:Props) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}
