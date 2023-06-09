import { Icons } from '../../helper/icons'
import { useState, useEffect, useRef } from 'react'

import { fetchInfoSong, fetchSong, playMusic } from '../../redux/SliceHome'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, useAppDispatch } from '~/redux/store'

import { covertTime } from '~/helper/utils'
import swal from 'sweetalert2'
import classNames from 'classnames'
import { songProp } from '../../types/song.types'
import { musicId } from '~/redux/SliceMusic'

export const Player = () => {
  const [audio, setAudio] = useState<HTMLAudioElement>(new Audio())
  const thumb = useRef<HTMLDivElement>(null)
  const [repeat, setRepeat] = useState<boolean>(false)
  const [VolumeMedium, setVolumeMedium] = useState<number>(30)
  const music = useSelector((state: RootState) => state.music)
  const home = useSelector((state: RootState) => state.home)

  const id = music.id as string

  const play = home.play
  const playAlbum = home.alBum
  const trackRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const dis = useDispatch()
  const [dataSong, setDataSong] = useState<songProp | null>(null)
  const [shift, setShift] = useState<boolean>(false)

  // useEffect(() => {
  //   if (play) {
  //     intervalId = setInterval(() => {
  //       // eslint-disable-next-line prefer-const
  //       let percent = Math.round((audio?.currentTime * 10000) / (dataSong?.duration as number)) / 100
  //       // console.log(Math.round(audio?.currentTime))
  //       // setCurrentSecond(Math.round(audio?.currentTime))
  //       // console.log(audio?.current.currentTime)
  //       // console.log(dataSong?.duration)
  //       if (thumb?.current !== null) {
  //         thumb.current.style.cssText = `right: ${100 - percent}%`
  //       }
  //     }, 1000)
  //   } else {
  //     return () => clearInterval(intervalId as number | string)
  //   }
  // }, [play])

  useEffect(() => {
    dispatch(fetchInfoSong({ id }))
      .unwrap()
      .then((res) => {
        if (res.err === 0) {
          setDataSong(res?.data)
          // setCurrentSecond(0)
        }
      })
    dispatch(fetchSong({ id }))
      .unwrap()
      .then((res) => {
        if (res?.err === 0) {
          audio.pause()
          setAudio(new Audio(res?.data?.['128']))
        } else {
          // swal.fire(res?.msg)
          setAudio(new Audio())
          dis(playMusic(false))
        }
      })
  }, [id])

  useEffect(() => {
    // setCurrentSecond(0)
    // audio.load()
    audio.pause()
    if (play) audio?.play()
  }, [ play,audio])
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
    <div className=' items-center grid grid-cols-7  bg-[rgb(19,12,28)] w-full h-[90px] text-[white] px-[1.75rem]  z-[20]'>
      <div className='flex items-center gap-4 col-span-2'>
        <img src={dataSong?.thumbnail} alt='avatar sing' className='w-[60px] h-[60px] rounded-sm' />
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
            className='w-[40px] h-[40px] border-2 rounded-full flex items-center justify-center'
            onClick={playMusics}
            aria-hidden='true'
          >
            {play ? <Icons.CgPlayPause size={25} /> : <Icons.MdPlayArrow size={25} />}
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
          <span className='text-[rgb(136,132,140)] text-[14px] font-bold'>01:22</span>
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
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z'
          />
        </svg>

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