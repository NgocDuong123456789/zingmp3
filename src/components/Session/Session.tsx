import { MusicProps } from '../../redux/SliceHome'
import ItemSong from '../ItemSong/ItemSong'
interface typeProps {
  data: MusicProps
}

export const Session = ({ data }: typeProps) => {
  return (
    <div className='  flex flex-col gap-5 mt-12'>
      <div className='flex items-center justify-between'>
        <h3 className='text-[20px] font-bold'>{data?.title}</h3>
        <span className='text-[20px]'>Tất cả</span>
      </div>
      <div className='grid grid-cols-5 gap-8'>
        {data.items?.slice(0, 5).map((item) => {
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
