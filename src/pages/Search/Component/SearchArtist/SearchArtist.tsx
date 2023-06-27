
import { useSelector } from 'react-redux'

import ArtisItem from '~/components/ArtisItem/ArtisItem'

import { Icons } from '~/helper/icons'
import { convertLike } from '~/helper/utils'
import { RootState } from '~/redux/store'

 const SearchArtist = () => {
  const artis = useSelector((state: RootState) => state.home?.searchAll?.artists)


  return (
    <div>
    
        <div className='pb-[150px] px-[1.75rem] bg-[#170F23] text-[white]'>
          <h2 className='text-[18px] font-bold py-4'>Nghệ Sĩ/OA</h2>
          {artis?.length > 0 ? (
            <div className='grid grid-cols-5 gap-4'>
              {artis?.map((item) => {
                return (
                  <ArtisItem
                    key={item.id}
                    alias={item.alias}
                    encodeId={item.id}
                    thumbnail={item.thumbnail}
                    link={item.link}
                    name={item.name}
                    totalFollow={convertLike(item.totalFollow) as number}
                  />
                )
              })}
            </div>
          ) : (
            <div className='h-[50vh] flex  justify-center items-center m-auto w-full bg-[#2F2739] rounded-lg'>
              <div className='w-full flex flex-col items-center'>
                <Icons.GiLoveSong size={50} />
                <p className='mt-4'>Không có nghệ sĩ/OA được tìm thấy</p>
              </div>
            </div>
          )}
        </div>
     
    </div>
  )
}

export default SearchArtist
