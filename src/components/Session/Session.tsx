// import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { musicId } from '~/redux/SliceMusic'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '~/redux/store'
// import { RootState } from '~/redux/store'
import { detailplaylist } from '~/redux/SliceHome'
import {  MusicProps } from '../../redux/SliceHome'
interface typeProps {
  data:  MusicProps
}
export const Session = ({ data }: typeProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  return (
    <div className='  flex flex-col gap-5 mt-12'>
      <div className='flex items-center justify-between'>
        <h3 className='text-[20px] font-bold'>{data?.title}</h3>
        <span className='text-[20px]'>Tất cả</span>
      </div>
      <div className='grid grid-cols-5 gap-8'>
        {data.items?.slice(0, 5).map((item) => {
          return (
            <div
              className='grid col-span-1'
              key={item.encodeId}
              aria-hidden='true'
              onClick={() => {
                navigate(item.link.split('.')[0])
                dispatch(detailplaylist({ id: item.encodeId }))
              }}
            >
              <img src={item.thumbnail} alt={item.title} className='items-center rounded-md w-full cursor-pointer' />

              <h3 className='font-bold text-[16px] py-[6px] line-clamp-2'>{item.title}</h3>
              <p className='text-[#8B8791] text-[13px] font-bold'>{item.artistsNames}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
