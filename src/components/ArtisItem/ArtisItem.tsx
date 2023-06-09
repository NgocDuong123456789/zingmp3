import { Icons } from '~/helper/icons'
import { Button } from '../Button/Button'
import { useState, useEffect, useRef } from 'react'
interface ArtisType {
  encodeId: string
  thumbnail: string
  link: string
  name: string
  totalFollow: number
}
const ArtisItem = ({ thumbnail, name, totalFollow }: ArtisType) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const handleMouseEnter = () => {
    setIsShow(true)
  
      imageRef?.current?.classList.add('animate-scale-up-image')
    
    
  }
  const handleMouseLeave = () => {
    setIsShow(false)
    
      imageRef?.current?.classList.remove('animate-scale-up-image')
   
  }

  return (
    <div
      className='w-full h-full col-span-1 flex flex-col items-center justify-center my-4 cursor-pointer '
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='w-full  relative overflow-hidden rounded-full hover:rounded-full'>
        {isShow && (
          <div className='w-full top-0 left-0 bottom-0 right-0 absolute bg-[rgba(0,0,0,0.3)] rounded-full flex items-center justify-center z-10  '>
            <span className='border p-3 rounded-full'>
              <Icons.BsArrowRepeat size={30} />
            </span>
          </div>
        )}
        <img src={thumbnail} alt='ảnh ca sĩ' className='w-full h-full object-cover rounded-full  ' ref={imageRef} />
      </div>
      <h2 className='text-bold text-[20px]'>{name}</h2>
      <p className='text-[#4E4858] my-2'>{totalFollow} quan tâm </p>
      <Button className='bg-[#9B4DE0] rounded-2xl px-2 py-1 text-[15px]'>QUAN TÂM</Button>
    </div>
  )
}

export default ArtisItem
