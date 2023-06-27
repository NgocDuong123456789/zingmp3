import { useState } from 'react'
import { useSelector } from 'react-redux'

import AlbumItem from '~/components/AlbumItem/AlbumItem'
import { RootState } from '~/redux/store'
import { songProp } from '~/types/song.types'

 const SearchSong = () => {
  const searchSong = useSelector((state: RootState) => state.home.searchAll.songs)
  const [codeId, setCodeId] = useState<string>('')
  return (
    <div>
     
        <div className='bg-[#170F23] px-[1.75rem] text-[white] pb-[120px] h-[100vh]'>
          <h2 className='text-[18px] font-bold py-4'>BÀI HÁT NỔI BẬT</h2>
          {searchSong.map((item: songProp, index: number) => {
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
     
    </div>
  )
}

export default SearchSong
