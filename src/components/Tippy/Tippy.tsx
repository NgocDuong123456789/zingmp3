import Tippy from '@tippyjs/react/headless'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  childrenProps: ReactNode
}
export const HeadlessTippy = ({ children, childrenProps }: Props) => {
  
  return (
    <Tippy
     
      trigger='click'
      interactive
      placement='bottom-end'
      render={(attrs) => (
        <div className='text-[black]' {...attrs}>
          {childrenProps}
        </div>
      )}
      
    >
      <div>{children}</div>
    </Tippy>
  )
}
