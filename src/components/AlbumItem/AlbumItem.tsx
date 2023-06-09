import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Icons } from '~/helper/icons'
import { covertTime } from '~/helper/utils'
import { playAlbum, playMusic } from '~/redux/SliceHome'
import { musicId } from '~/redux/SliceMusic'
import classNames from 'classnames'

interface AlbumItemType {
  encodeId: string
  thumbnail: string
  title: string
  artistsNames: string
  duration: number
  albumTitle: string
}

const AlbumItem = ({ encodeId, thumbnail, title, artistsNames, duration, albumTitle }: AlbumItemType) => {
  const dispatch = useDispatch()
  const [isHover, setIsHover] = useState<boolean>(true)
  const [codeId, setCodeId] = useState<string>('')
  // const handleMouseEnter = () => {
  //   setIsHover(true)
  // }
  // const handleMouseLeave = () => {
  //   setIsHover(false)
  // }

  return (
    <div
      className={classNames(
        'grid grid-cols-5 w-full f items-center hover:bg-[#423C4B] px-2 hover:rounded-md hover:cursor-pointer border-b border-[#423C4B] ',
        // {
        //   'bg-[#2F2739]': codeId === encodeId,
        //   'bg-[red]': codeId !== encodeId
        // }
        
      )}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      <div className='gap-2 col-span-2  flex items-center py-3 cursor-pointer'>
        <Icons.BiMusic />
        <div className='w-[40px] h-[40px] relative'>
          <img aria-hidden='true' src={thumbnail} alt='ảnh bài hát' className='w-full h-full object-cover rounded-lg' />
          {isHover && (
            <div
              className='top-0 left-0 bottom-0 right-0 absolute  flex items-center justify-center '
              aria-hidden='true'
              onClick={(e) => {
                e.stopPropagation()
                setCodeId(encodeId)
                dispatch(musicId(encodeId))
                dispatch(playMusic(true))
                dispatch(playAlbum(true))
              }}
            >
              <Icons.BsFillPlayFill size={25} />
            </div>
          )}
        </div>
        <div className='flex-col flex items-center'>
          <p className='font-semibold text-[14px] line-clamp-1'>{title}</p>

          <span className='text-[12px] font-semibold text-[#7C7782]'>{artistsNames}</span>
        </div>
      </div>
      <div className='flex items-center justify-center col-span-2 '>
        <p className='   line-clamp-1 text-[13px] '>{albumTitle}</p>
      </div>
      <p className='col-span-1 flex items-center justify-end'>{covertTime(duration)}</p>
    </div>
  )
}

export default AlbumItem
