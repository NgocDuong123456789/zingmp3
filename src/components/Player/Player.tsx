import { Icons } from '../../helper/icons'
import { useState, useEffect, useRef } from 'react'
import './Player.css'
import { fetchInfoSong, fetchSong } from '../../redux/SliceHome'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, useAppDispatch } from '~/redux/store'
import { playMusic } from '../../redux/SliceHome'
import { covertTime } from '~/helper/utils'
import swal from 'sweetalert2'
interface songProp {
  artistsNames: string
  title: string
  thumbnail: string
  duration: number
}
let intervalId: string | number | NodeJS.Timer | null | undefined
export const Player = () => {
  const [audio, setAudio] = useState<HTMLAudioElement>(new Audio())
  const thumb = useRef<HTMLDivElement>(null)
  // const [currentSecond, setCurrentSecond] = useState<number>(0)
  // console.log(currentSecond)
  const music = useSelector((state: RootState) => state.music)
  const home = useSelector((state: RootState) => state.home)
  const id = music.id as string
  const play = home.play as boolean
  const trackRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const dis = useDispatch()
  const [dataSong, setDataSong] = useState<songProp | null>(null)

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
        if (res.err === 0) {
          audio.pause()
          setAudio(new Audio(res?.data?.['128']))
        } else {
          swal.fire(res.msg)
          setAudio(new Audio())
          dis(playMusic(false))
        }
      })
  }, [id])
  // console.log(useSelector((state: RootState) => state?.home))
  useEffect(() => {
    // setCurrentSecond(0)
    // audio.load()
    audio.pause()
    if (play) audio?.play()
  }, [audio, play])
  const playMusics = () => {
    if (play) {
      audio?.pause()
      dis(playMusic(false))
    } else {
      dis(playMusic(true))
      audio?.play()
    }
  }
  const handleprogressbar = (e: any) => {
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
  return (
    <div className='flex items-center justify-between bg-[rgb(19,12,28)] w-full h-[90px] text-[white] px-[1.75rem] '>
      <div className='flex items-center gap-4 '>
        <img src={dataSong?.thumbnail} alt='avatar sing' className='w-[60px] h-[60px] rounded-sm' />
        <div>
          <h3 className='font-bold'>{dataSong?.title}</h3>
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
      <div className='flex flex-col  items-center'>
        <div className='flex items-center gap-10 cursor-pointer '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3' />
          </svg>

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
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z'
            />
          </svg>

          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3' />
          </svg>
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
      <div className='flex items-center gap-5 cursor-pointer'>
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
          <Icons.ImVolumeMedium size={25} />
          <input type='range' />
        </div>
      </div>
    </div>
  )
}
