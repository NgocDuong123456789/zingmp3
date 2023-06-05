import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAppDispatch, RootState } from '~/redux/store'
import { detailplaylist, fetchHome, playAlbum, playMusic } from '../../redux/SliceHome'
import { musicId } from '~/redux/SliceMusic'
import { useNavigate } from 'react-router-dom'
import { link } from 'fs'
interface BannerProp {
  type: number
  sectionType: string
  banner: string
  cover: string
  encodeId: string
  ispr: number
}

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
  // const musicid = useSelector((state: RootState) => state.id)
  // const id = musicid.id as string
  const homeList = useSelector((state: RootState) => state?.home)
 
  useEffect(() => {
    dispatch(fetchHome())
  }, [])
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
    console.log(item)
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
    <div className='w-full gap-4 flex items-center overflow-hidden rounded-lg relative mt-[80px]'>
      {homeList?.banner?.map((item: banner, index: number) => (
        <img
          src={item?.banner}
          alt='ảnh banner'
          key={index}
          className='flex-1 object-contain w-1/3  image-slice  rounded-lg animate-slide'
          aria-hidden='true'
          onClick={() => handleClickBanner(item)}
        />
      ))}
      <div>
        <div className='absolute top-[50%] translate-y-[-50%] left-[10px] w-[50px] h-[50px] bg-[#393142] rounded-full flex items-center justify-center cursor-pointer'>
          <svg
            // onClick={handlePrev}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
          </svg>
        </div>
        <div className='absolute top-[50%] translate-y-[-50%] right-[10px] w-[50px] h-[50px] bg-[#393142] rounded-full flex items-center justify-center cursor-pointer'>
          <svg
            // onClick={handleNext}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-7 h-7 '
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
          </svg>
        </div>
      </div>
    </div>
  )
}
