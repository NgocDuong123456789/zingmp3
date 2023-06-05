/* eslint-disable import/no-unresolved */
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { Icons } from '~/helper/icons'
import { RootState } from '~/redux/store'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { playList } from '../../types/playList.types'
import { convertLike, convertNumberToTime, convertToDate, covertTime } from '~/helper/utils'
import { songProp } from '~/types/song.types'
import { musicId} from '~/redux/SliceMusic'
import { playMusic } from '~/redux/SliceHome'

export const Abum = () => {
  const dispatch = useDispatch()
  const homeList = useSelector((state: RootState) => state?.home.playList)

  const playList = (homeList as any)?.data as playList
 
  return (
    <Scrollbars
      style={{ width: '100%', height: 600, marginTop: 74 }}
      className='scrollbar-thin scrollbar-thumb-[#170F23] scrollbar-track-[red]'
    >
      <div className='grid grid-cols-12 px-[1.75rem] bg-[#170F23] text-[white] gap-[20px] py-[60px] w-full'>
        <div className=' col-span-3 flex flex-col w-full items-center  '>
          <img
            src={playList?.thumbnail}
            alt='ảnh đại diện abum nhạc'
            className='w-full object-cover rounded-lg cursor-pointer'
          />

          <h2 className='font-bold text-[20px] my-3 line-clamp-1'>{playList?.aliasTitle}</h2>
          <p>{`cập nhật : ${convertToDate(playList?.contentLastUpdate)}`}</p>
          <div className=' my-2 line-clamp-1'>
            {playList?.genreIds?.map((item: string, index: number) => {
              return <p key={index}>{item} , </p>
            })}
          </div>
          <p>{`${convertLike(playList?.like)} người yêu thích`}</p>
          <div className='flex items-center bg-[rgb(155,77,224)] px-2 py-2 rounded-lg cursor-pointer my-2'>
            <Icons.CgPlayPause size={25} />

            <p className='text-[14px]'>TIẾP TỤC PHÁT</p>
          </div>
          <div className='flex items-center gap-3 my-4'>
            <div className='w-[40px] h-[40px] rounded-full bg-[#2F2739] flex items-center justify-center cursor-pointer'>
              <Icons.BsThreeDots size={20} />
            </div>
            <div className='w-[40px] h-[40px] rounded-full bg-[#2F2739] flex items-center justify-center cursor-pointer'>
              <Icons.AiOutlineHeart size={20} />
            </div>
          </div>
        </div>
        <div className='col-span-9'>
          <p>Lời tựa và những đại diện K-pop ngầu đét</p>
          <div className='grid grid-cols-5 w-full px-2 py-2'>
            <div className=' gap-2 col-span-2 flex items-center '>
              <Icons.GiLevelThreeAdvanced />
              <p>BÀI HÁT</p>
            </div>
            <p className='col-span-2  flex items-center justify-center'>ABUM</p>
            <p className='col2-span-1  flex items-center justify-end'> THỜI GIAN</p>
          </div>
          <div>
            {playList?.song?.items?.map((items: songProp, index: number) => {
              return (
                <div
                  key={index}
                  className='grid grid-cols-5 w-full f items-center hover:bg-[#423C4B] px-2 hover:rounded-md hover:cursor-pointer border-b border-[#423C4B] '
                >
                  <div className='gap-2 col-span-2  flex items-center py-3 cursor-pointer'>
                    <Icons.BiMusic />
                    <img
                      aria-hidden='true'
                      onClick={() => 
                       {
                        dispatch(musicId(items?.encodeId))
                         dispatch(playMusic(true))
                       }
                      }
                      src={items?.thumbnail}
                      alt='ảnh bài hát'
                      className='w-[40px] h-[40px] object-cover rounded-lg'
                    />
                    <div className='flex-col flex items-center'>
                      <p className='font-semibold text-[14px] line-clamp-1'>{items?.title}</p>

                      <span className='text-[12px] font-semibold text-[#7C7782]'>{items?.artistsNames}</span>
                    </div>
                  </div>
                  <div className='flex items-center justify-center col-span-2 '>
                    <p className='   line-clamp-1 text-[13px] '>{items?.album?.title}</p>
                  </div>
                  <p className='col-span-1 flex items-center justify-end'>{covertTime(items?.duration)}</p>
                </div>
              )
            })}
          </div>
          <div className='flex items-center gap-3 py-2'>
            <span>{`${playList?.song?.total} bài hát`}</span>
            <div className='w-1 h-1 rounded-full bg-[white]'></div>
            <span>{convertNumberToTime(playList?.song?.totalDuration)}</span>
          </div>
        </div>
      </div>
    </Scrollbars>
  )
}
