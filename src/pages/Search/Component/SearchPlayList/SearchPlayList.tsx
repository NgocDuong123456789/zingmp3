import { useSelector } from 'react-redux'

import ItemSong from '~/components/ItemSong/ItemSong'
import { Skeleton } from '~/components/Skeleton/Skeleton'
import { RootState } from '~/redux/store'

const SearchPlayList = () => {
  const playListSong = useSelector((state: RootState) => state.home.searchAll.playlists)
  const isLoading = useSelector((state: RootState) => state.home?.isLoading)

  return (
    <div>
      {
        isLoading ? (<div className='px-4 mt-[50px]  w-full items-center grid grid-cols-3 gap-4'>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>) : (  <div className='pb-[100px] px-[1.75rem] bg-[#170F23] text-[white]'>
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
      </div>)
      }
    </div>
  
  )
}

export default SearchPlayList