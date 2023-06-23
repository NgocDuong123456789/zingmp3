import { Icons } from '../../helper/icons'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import { toast } from 'react-toastify'

import { fetchInfoSong, fetchSong, playMusic } from '../../redux/SliceHome'
import { RootState, useAppDispatch } from '~/redux/store'
import { covertTime } from '~/helper/utils'
import { songProp } from '../../types/song.types'
import { musicId } from '~/redux/SliceMusic'
import { AudioLoader } from '../AudioLoading/AudioLoading'

let timer: any

export const Player = () => {
  const [audio, setAudio] = useState<HTMLAudioElement>(new Audio())
  const thumb = useRef<HTMLDivElement>(null)
  const [repeat, setRepeat] = useState<boolean>(false)
  const [VolumeMedium, setVolumeMedium] = useState<number>(30)
  const music = useSelector((state: RootState) => state.music)
  const home = useSelector((state: RootState) => state.home)
  const isLoadingSong = useSelector((state: RootState) => state.home.isLoadingSong)
 
  const id = music.id as string
  const play = home.play
 
  const playAlbum = home.alBum
  const trackRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const dis = useDispatch()
  const [currentTime, setCurrentTime] = useState<string | number>('00:00')
  const [dataSong, setDataSong] = useState<songProp | null>(null)

  const [shift, setShift] = useState<boolean>(false)

  useEffect(() => {
    dispatch(fetchInfoSong({ id }))
      .unwrap()
      .then((res) => {
        if (res.err === 0) {
          setDataSong(res?.data)
        }
      })
    dispatch(fetchSong({ id }))
      .unwrap()
      .then((res) => {
        if (res?.err === 0) {
          audio.pause()
          setAudio(new Audio(res?.data?.['128']))
        } else {
          setAudio(new Audio())
          dis(playMusic(false))
          toast.warn('Bài hát chỉ dành cho VIP !')
        }
      })
  }, [id])

  useEffect(() => {
    timer && clearInterval(timer as any)
    audio.currentTime = 0
    // audio.load()
    audio.pause()
    if (play) {
      audio?.play()
      // if (isLoadingSong) {
      //   dis(playMusic(false))
      // } else {
      //   dis(playMusic(true))
      // }
      timer = setInterval(() => {
        setCurrentTime(covertTime(audio.currentTime))
        const percent = Math.round((audio?.currentTime * 10000) / (dataSong?.duration as number)) / 100
        ;(thumb?.current as HTMLDivElement).style.cssText = `right:${100 - percent}%`
      }, 1000)
    }
  }, [audio, play, isLoadingSong])
  //  console.log(play)

  const playMusics = () => {
    if (play) {
      audio?.pause()
      dis(playMusic(false))
    } else {
      dis(playMusic(true))
      audio?.play()
    }
  }

  useEffect(() => {
    const handleEnd = () => {
      if (shift) {
        handleRandomSong()
      } else if (repeat) {
        handleNextSong()
      } else {
        dis(playMusic(false))
        audio.pause()
      }
    }

    audio.addEventListener('ended', handleEnd)
    return () => audio.removeEventListener('ended', handleEnd)
  }, [audio, shift, repeat])
  const handleprogressbar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (trackRef.current) {
      const percent = Math.round(
        ((e.clientX - trackRef.current.getBoundingClientRect().left) / trackRef.current.getBoundingClientRect().width) *
          100
      )
      if (thumb.current) {
        thumb.current.style.cssText = `right:${100 - percent}%`
        audio.currentTime = (audio.duration * percent) / 100
      }
    }
  }

  const handleNextSong = () => {
    if (playAlbum) {
      const findIdSong = home.detailplaylist?.data?.song.items.findIndex((item: songProp) => item.encodeId === id)
      dispatch(musicId(home.detailplaylist?.data?.song.items[findIdSong + 1].encodeId))
      dis(playMusic(true))
    }
  }

  const handlePrevSong = () => {
    if (playAlbum) {
      const findIdSong = home.detailplaylist?.data?.song.items.findIndex((item: songProp) => item.encodeId === id)
      dispatch(musicId(home.detailplaylist?.data?.song.items[findIdSong - 1].encodeId))
      dis(playMusic(true))
    }
  }
  const handleRandomSong = () => {
    const randomIndexSong = Math.floor(Math.random() * home.detailplaylist?.data?.song.items.length) - 1
    dispatch(musicId(home.detailplaylist?.data?.song.items[randomIndexSong - 1]?.encodeId))
    dis(playMusic(true))
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolumeMedium(Number(e.target.value))
  }
  audio.volume = 0.3
  useEffect(() => {
    audio.volume = VolumeMedium / 100
  }, [VolumeMedium])

  return (
    <div className=' items-center grid grid-cols-7  bg-[rgb(19,12,28)] w-full h-[90px] text-[white] px-[1.75rem]  z-50 fixed bottom-0 '>
      {isLoadingSong ? (
        <div
          role='status'
          className=' flex items-center gap-4 col-span-2 space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center'
        >
          <div className='flex items-center justify-center w-full  bg-gray-300 rounded  dark:bg-gray-700'>
            <svg
              className='w-4 h-10 text-gray-200'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 640 512'
            >
              <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
            </svg>
          </div>
          <div className='w-full'>
            <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5'></div>
            <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]'></div>
          </div>
        </div>
      ) : (
        <div className='flex items-center gap-4 col-span-2'>
          <img src={dataSong?.thumbnail} alt='avatar sing' className='w-[50px] h-[50px] rounded-sm' />
          <div>
            <h3 className='font-bold line-clamp-1'>{dataSong?.title}</h3>
            <p className='text-[rgb(136,132,140)]'>{dataSong?.artistsNames}</p>
          </div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 cursor-pointer'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
            />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 cursor-pointer'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
            />
          </svg>
        </div>
      )}

      <div className='flex flex-col justify-center w-full m-auto   items-center col-span-3'>
        <div className='flex items-center gap-10 cursor-pointer '>
          <Icons.FaRandom
            size={0}
            title='phát nhạc ngẫu nhiên'
            onClick={() => setShift((prev) => !prev)}
            className={classNames('w-6 h-6', {
              'fill-[#C273ED]': shift,
              'fill-[white]': !shift
            })}
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 fill-[white]'
            onClick={handlePrevSong}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z'
            />
          </svg>

          <div
            className='w-[40px] h-[40px] border-2 rounded-full flex items-center justify-center hover:text-[#8B45CA] hover:border-[#8B45CA]'
            onClick={playMusics}
            aria-hidden='true'
          >
            
            {
              isLoadingSong ? (  
                <>
                  <AudioLoader />
                 {/* {dis(playMusic(false))}  */}
                </>
              )
              : (play ? <Icons.CgPlayPause size={25} /> : <Icons.MdPlayArrow size={25} />
            )}
          </div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={classNames('w-6 h-6', {
              'fill-[rgb(124,121,129)] cursor-not-allowed': !playAlbum,
              'fill-[white] cursor-pointer': playAlbum
            })}
            onClick={handleNextSong}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z'
            />
          </svg>
          <Icons.BsArrowRepeat
            size={23}
            title='Bật phát lại 1 bài'
            onClick={() => setRepeat((prev) => !prev)}
            className={classNames('w-6 h-6', {
              'fill-[#C273ED]': repeat,
              'fill-[white]': !repeat
            })}
          />
        </div>
        <div className='flex items-center gap-3'>
          <span className='text-[rgb(136,132,140)] text-[14px] font-bold'>{currentTime}</span>
          <div className='w-full'>
            <div
              className=' w-[300px] h-[3px] hover:h-[6px] bg-[white] rounded-md relative  cursor-pointer'
              onClick={handleprogressbar}
              aria-hidden='true'
              ref={trackRef}
            >
              <div className='absolute top-0 left-0 bottom-0 bg-[red]  rounded-md  cursor-pointer' ref={thumb}></div>
            </div>
          </div>
         <span className='text-[14px] font-bold'>{covertTime(dataSong?.duration as number)}</span>
        </div>
      </div>
      <div className='flex items-center justify-end gap-5 cursor-pointer col-span-2'>
        <div className='flex items-center gap-2'>
          {VolumeMedium <= 0 ? (
            <Icons.BsFillVolumeMuteFill size={25} onClick={() => setVolumeMedium(40)} />
          ) : (
            <Icons.ImVolumeMedium size={25} onClick={() => setVolumeMedium(0)} />
          )}
          <input
            type='range'
            step='0.1'
            min={0}
            max={100}
            value={VolumeMedium}
            onChange={handleVolumeChange}
            className='w-full cursor-pointer'
          />
        </div>
      </div>
    </div>
  )
}
