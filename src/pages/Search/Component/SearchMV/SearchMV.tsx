import { useSelector } from 'react-redux'

import MVItem from '~/components/MVItem/MVItem'
import { RootState } from '~/redux/store'

export const SearchMV = () => {
  const mv = useSelector((state: RootState) => state.home.searchAll.videos)
  

  return (

      <div className='pb-[120px] px-[1.75rem] bg-[#1F182B] text-[white]'>
        <h2 className='text-[18px] font-bold py-4'>MV</h2>
        <div className='grid grid-cols-3 gap-4'>
          {mv?.map((item) => {
            return (
              <MVItem
                key={item.encodeId}
                encodeId={item.encodeId}
                title={item.title}
                thumbnail={item.thumbnail}
                link={item.link}
                artistsNames={item.artistsNames}
                thumbnailM={item.thumbnailM}
              />
            )
          })}
        </div>
      </div>)
     
}
