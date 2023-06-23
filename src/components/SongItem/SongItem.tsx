import { useDispatch, useSelector } from 'react-redux'

import { playMusic } from '~/redux/SliceHome'
import { musicId } from '~/redux/SliceMusic'
import { RootState } from '~/redux/store'
interface SongItemType {
  title: string
  thumbnail: string
  encodeId: string
  artistsNames: string
  time?: string
}

export const SongItem = ({ title, thumbnail, artistsNames, encodeId, time }: SongItemType) => {
  const dispatch = useDispatch()
  const isLoadingSong = useSelector((state: RootState) => state.home.isLoadingSong)

  return (
    <div className='w-full col-span-1 flex items-center mb-5 justify-between cursor-pointer hover:bg-[#2F2739] hover:rounded-lg hover:z-10 pr-5'>
      <div className='flex items-center gap-3'>
        <img
          src={thumbnail}
          alt='avatar'
          className='w-[70px] h-[70px] rounded-sm'
          aria-hidden='true'
          onClick={() => {

           isLoadingSong ? dispatch(playMusic(false)) : dispatch(playMusic(true))
            dispatch(musicId(encodeId))
          }}
        />
        <div>
          <h3 className='text-[15px]'>{title}</h3>
          <p className='text-[13px] text-[hsla(0,0%,100%,0.5)]'>{artistsNames}</p>
          <p className='text-[13px] text-[hsla(0,0%,100%,0.5)]'>4 ngày trước</p>
        </div>
      </div>
      <div>{time}</div>
    </div>
  )
}
