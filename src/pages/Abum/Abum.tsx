import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'

import AudioLoading from '../../components/AudioLoading/AudioLoading'
import { Icons } from '~/helper/icons'
import { RootState } from '~/redux/store'
import { convertLike, convertNumberToTime, convertToDate } from '~/helper/utils'
import { songProp } from '~/types/song.types'
import { musicId } from '~/redux/SliceMusic'
import { playMusic } from '~/redux/SliceHome'
import AlbumItem from '~/components/AlbumItem/AlbumItem'
import { Skeleton } from '~/components/Skeleton/Skeleton'

export const Abum = () => {
  //   const location = useLocation()
  const dispatch = useDispatch()
  const [codeId, setCodeId] = useState<string>('')
  const homeList = useSelector((state: RootState) => state?.home)
  const playList = homeList?.detailplaylist?.data
  const isLoading = useSelector((state: RootState) => state?.home.isLoading)
  console.log(isLoading)
  const play = homeList?.play

  const renderThumb = () => {
    const thumbStyle = {
      backgroundColor: '#4A4250',
      borderRadius: '8px',
      marginTop: '40px'
    }
    return <div style={{ ...thumbStyle }} />
  }
  return (
    <div>
      {isLoading ? (
        <div className='px-4 mt-[100px]  w-full items-center grid grid-cols-3 gap-4'>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <Scrollbars style={{ width: '100%', height: 600, marginTop: 74 }} renderThumbVertical={renderThumb}>
          <div className='grid grid-cols-12 px-[1.75rem] bg-[#170F23] text-[white] gap-[20px] py-[60px] w-full'>
            <div className=' col-span-3 flex flex-col w-full items-center  '>
              <div className='w-full relative overflow-hidden'>
                <img
                  src={playList?.thumbnail}
                  alt='ảnh đại diện abum nhạc'
                  className={`w-full object-cover cursor-pointer  ${
                    play ? 'rounded-full animate-rotateCenter' : 'rounded-md '
                  }`}
                />
                <div className='top-0 right-0 absolute left-0 bottom-0 hover:bg-[rgba(0,0,0,0.3)] hover:rounded-md items-center justify-center flex cursor-pointer'>
                  <span className='p-2 rounded-full border items-center flex justify-center'>
                    {play ? (
                      <span aria-hidden='true' onClick={() => dispatch(playMusic(false))}>
                        <AudioLoading />
                      </span>
                    ) : (
                      <Icons.BsFillPlayFill size={40} onClick={() => dispatch(playMusic(true))} />
                    )}
                  </span>
                </div>
              </div>

              <h2 className='font-bold text-[20px] my-3 line-clamp-1'>{playList?.aliasTitle}</h2>
              <p>{`cập nhật : ${convertToDate(playList?.contentLastUpdate)}`}</p>
              <div className=' my-2 line-clamp-1'>
                {playList?.genreIds?.map((item: string, index: number) => {
                  return <p key={index}>{item} , </p>
                })}
              </div>
              <p>{`${convertLike(playList?.like)} người yêu thích`}</p>

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
                {playList?.song?.items?.map((item: songProp, index: number) => {
                  return (
                    <AlbumItem
                      codeId={codeId}
                      setCodeId={setCodeId}
                      key={index}
                      encodeId={item.encodeId}
                      title={item.title}
                      duration={item.duration}
                      thumbnail={item.thumbnail}
                      albumTitle={item?.album?.title}
                      artistsNames={item.artistsNames}
                    />
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
      )}
    </div>
  )
}
