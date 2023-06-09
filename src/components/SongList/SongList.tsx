import { art } from '../../redux/SliceHome'
import {SongItem } from '../SongItem/SongItem'
interface musicProp {
  data: art[]
}
const SongList = ({ data }: musicProp) => {
  return (
    <div>
      <div className='grid grid-cols-3 gap-3'>
        {data?.slice(0, 12)?.map((item: art, index:number) => {
          return ( <SongItem
            key={index}
            encodeId={item.encodeId}
            title={item.title}
            thumbnail={item.thumbnail}
            artistsNames={item.artistsNames}
          />)
           
          
          
        })}
      </div>
    </div>
  )
}

export default SongList
