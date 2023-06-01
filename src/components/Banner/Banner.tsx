import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch, RootState } from '~/redux/store'
import { fetchHome } from '../../redux/SliceHome'
interface BannerProp {
  type: number
  banner: string
  cover: string
  encodeId: string
  ispr: number
}
export const Banner = () => {
  const dispatch = useAppDispatch()
  const homeList = useSelector((state: RootState) => state.home.listHome)
  const banner = (homeList as any).data?.items[0].items.map((item: BannerProp) => item.banner)

  useEffect(() => {
    dispatch(fetchHome())
  }, [])
  useEffect(() => {
    const imageSlice = document.getElementsByClassName('image-slice')
    let min = 0
    let max = 2
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
  return (
    <div className='w-full gap-4 flex items-center overflow-hidden rounded-lg'>
      {banner?.map((item: string, index: number) => (
        <img
          src={item}
          alt='ảnh banner'
          key={index}
          className='flex-1 object-contain w-1/3  image-slice  rounded-lg animate-slide'
        />
      ))}
    </div>
  )
}
