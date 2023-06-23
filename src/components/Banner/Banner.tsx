import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, RootState } from '~/redux/store'
import { detailplaylist, playAlbum, playMusic } from '../../redux/SliceHome'
import { musicId } from '~/redux/SliceMusic'



interface banner {
  banner: string
  cover: string
  description: string
  encodeId: string
  ispr: number
  link: string
  target: string
  title: string
  type: number
}
export const Banner = () => {
  const dis = useDispatch()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const homeList = useSelector((state: RootState) => state?.home?.banner)


  let min = 0
  let max = 2
  useEffect(() => {
    const imageSlice = document.getElementsByClassName('image-slice')
    const interval = setInterval(() => {
      for (let i = 0; i < imageSlice.length; i++) {
        if (i >= min && i <= max) {
          ;(imageSlice[i] as HTMLImageElement).style.cssText = `display:block`
        } else {
          ;(imageSlice[i] as HTMLImageElement).style.cssText = 'display:none'
        }
      }
      min++
      max++
      if (min > 3) min = 0
      if (max > 5) max = 2
    }, 4000)

    return () => {
      interval && clearInterval(interval)
    }
  }, [])

  const handleClickBanner = (item: banner) => {
   
    if (item.type === 1) {
      dis(musicId(item.encodeId))
      dis(playMusic(true))
      dis(playAlbum(false))
    } else if (item.type === 4) {
      const id = item.encodeId
      dispatch(detailplaylist({ id })).then((res) => {
        const linkPath = res?.payload?.data?.link?.split('.')[0]
        navigate(linkPath)
      })
    } else {
      dis(playAlbum(false))
    }
  }
  return (
 
 <div className='w-full gap-4 flex items-center overflow-hidden rounded-lg relative mt-[40px] cursor-pointer'>
      {homeList?.map((item: banner, index: number) => (
        <img
          src={item?.banner}
          alt='ảnh banner'
          key={index}
          className='flex-1 object-contain w-1/3  image-slice  rounded-lg animate-slide'
          aria-hidden='true'
          onClick={() => handleClickBanner(item)}
        />
      ))}
     
    </div>
  )
}
