import React from 'react'
import { useSelector } from 'react-redux'
import ItemSong from '~/components/ItemSong/ItemSong'
import { RootState } from '~/redux/store'

const SearchPlayList = () => {
  const playListSong = useSelector((state: RootState) => state.home.searchAll.playlists)
  return (
    <div className='pb-[100px] px-[1.75rem] bg-[#170F23] text-[white]'>
    <h2 className='text-[18px] font-bold py-4'>Playlist/Album</h2>
    <div className='grid grid-cols-5 gap-6'>
      {playListSong?.map((item) => {
        return (
          <ItemSong
            key={item.encodeId}
            encodeId={item.encodeId}
            title={item.title}
            thumbnail={item.thumbnail}
            link={item.link}
            artistsNames={item.artistsNames}
          />
        )
      })}
    </div>
  </div>
  )
}

export default SearchPlayList