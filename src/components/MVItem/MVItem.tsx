import { useState, useRef } from 'react'
import { Icons } from '~/helper/icons'
interface MVType {
  encodeId: string
  title: string
  thumbnail: string
  link: string
  artistsNames: string
  thumbnailM: string
}
const MVItem = ({ encodeId, title, thumbnail, link, artistsNames, thumbnailM }: MVType) => {
  const [isHover, setIsHover] = useState<boolean>(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const handleMouseEnter = () => {
    setIsHover(true)
    imageRef?.current?.classList.add('animate-scale-up-image')
  }
  const handleMouseLeave = () => {
    setIsHover(false)
    imageRef?.current?.classList.remove('animate-scale-up-image')
  }
  return (
    <div
      className='grid grid-cols-1 pb-5 cursor-pointer'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='w-full relative overflow-hidden hover:rounded-2xl'>
        <img src={thumbnail} alt='ảnh video' className='w-full object-cover rounded-2xl ' ref={imageRef} />
        {isHover && (
          <div className='top-0 left-0 right-0 bottom-0 absolute flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-5'>
            <span className='border-2 p-3 rounded-full'>
              <Icons.BsFillPlayFill size={30} />
            </span>
          </div>
        )}
      </div>

      <div className='flex items-center gap-2 mt-3'>
        <img src={thumbnailM} alt='ảnh nghệ sĩ' className='w-[50px] h-[50px]  object-cover rounded-full' />
        <div>
          <p className='text-bold'>{title}</p>
          <p className='text-[#87838D]'> {artistsNames}</p>
        </div>
      </div>
    </div>
  )
}

export default MVItem
