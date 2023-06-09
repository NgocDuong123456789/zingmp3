import React from 'react'
import { useSelector } from 'react-redux'
import ArtisItem from '~/components/ArtisItem/ArtisItem'
import { convertLike } from '~/helper/utils'
import { RootState } from '~/redux/store'

export const SearchArtist = () => {
  const artis = useSelector((state: RootState) => state.home.searchAll.artists)
  return (
      <div className='pb-[150px] px-[1.75rem] bg-[#170F23] text-[white]'>
    <h2 className='text-[18px] font-bold py-4'>Nghệ Sĩ/OA</h2>
    <div className='grid grid-cols-5 gap-4'>
      {artis?.map(item => {
        return (
          <ArtisItem
            key={item.id}
            encodeId={item.id}
            thumbnail={item.thumbnail}
            link={item.link}
            name={item.name}
            totalFollow={convertLike(item.totalFollow) as number}
          />
        )
      })}
    </div>
  </div>
  )
}
