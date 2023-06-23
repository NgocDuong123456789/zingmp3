import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

import { Icons } from '~/helper/icons'
import { playMusic } from '~/redux/SliceHome'
import { musicId } from '~/redux/SliceMusic'
import { RootState } from '~/redux/store'
interface TypeProp {
  title: string
  artistsNames: string
  thumbnail: string
  encodeId: string
}

const OutSandSong = ({ title, artistsNames, thumbnail, encodeId }: TypeProp) => {
  const dispatch = useDispatch()
  const [isHover, setIsHover] = useState(false)
  const play = useSelector((state: RootState) => state.home.play)
  const handleMouseEnter = () => {
    setIsHover(true)
  }
  const handleMouseLeave = () => {
    setIsHover(false)
  }
  return (
    <div
      aria-hidden='true'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        dispatch(musicId(encodeId))
        dispatch(playMusic(true))
      }}
      className=''
    >
      <div className='flex items-center gap-3 bg-[#2F2739] rounded-lg cursor-pointer  col-span-1 hover:bg-[#403943] hover:z-20 hover:rounded-lg'>
        <div className='relative'>
          {isHover && (
            <span className='left-0 right-0 top-0 bottom-0 absolute flex items-center justify-center'>
              <Icons.BsFillPlayFill size={30} />
            </span>
          )}
          
          <img src={thumbnail} alt='bài hát nổi bật' className='w-[100px] h-[100px] rounded-sm' />
        </div>
        <div>
          <p className='text-[#78747F]'>Bài hát</p>
          <h3 className='text-[white] font-semibold'>{title}</h3>
          <p className='text-[#78747F]'>{artistsNames}</p>
        </div>
      </div>
    </div>
  )
}

export default OutSandSong
