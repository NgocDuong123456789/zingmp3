import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icons } from '~/helper/icons'
import { detailplaylist } from '~/redux/SliceHome'
import { useAppDispatch } from '~/redux/store'
interface ItemSongType {
  title: string
  link: string
  encodeId: string
  thumbnail: string
  artistsNames: string
}
const ItemSong = ({ title, link, artistsNames, thumbnail, encodeId }: ItemSongType) => {
  const refImage = useRef<HTMLImageElement>(null)
  const [isHover, setIsHover] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleMouse = () => {
    setIsHover(true)
    if (refImage.current) {
      refImage?.current?.classList?.add('animate-scale-up-image')
    }
  }
  const handleMouseLeave = () => {
    setIsHover(false)
    if (refImage.current) {
      refImage?.current?.classList?.remove('animate-scale-up-image')
    }
  }
  return (
    <div
      className='grid col-span-1 pb-6 '
      aria-hidden='true'
      onClick={() => {
        navigate(link.split('.')[0], { state: {playAlbum: false } })
        dispatch(detailplaylist({ id: encodeId }))
      }}
    >
      <div
        className='relative w-full overflow-hidden cursor-pointer hover:rounded-md'
        onMouseEnter={handleMouse}
        onMouseLeave={handleMouseLeave}
      >
        {isHover && (
          <div className='top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)] rounded-md  absolute z-10  gap-3 flex items-center justify-center'>
            <Icons.BsThreeDots size={25} />
            <span className='p-3 rounded-full border-2'>
              <Icons.MdPlayArrow
                size={30}
                // onClick={(e: any) => {
                //   e.stopPropagation()
                //   navigate(link.split('.')[0], {state:{playAlbum: true}})
                // }}
              />
            </span>
            <Icons.AiOutlineHeart size={25} />
          </div>
        )}
        <img src={thumbnail} alt={title} className='items-center rounded-md  w-full cursor-pointer ' ref={refImage} />
      </div>

      <h3 className='font-bold text-[16px] py-[6px] line-clamp-2'>{title}</h3>
      <p className='text-[#8B8791] text-[13px] font-bold'>{artistsNames}</p>
    </div>
  )
}

export default ItemSong
