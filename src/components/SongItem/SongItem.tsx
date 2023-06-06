import { useDispatch } from 'react-redux'
import { playMusic } from '~/redux/SliceHome'
import { musicId } from '~/redux/SliceMusic'
import { art } from '../../redux/SliceHome'
interface musicProp {
  data: art[]
}
const SongItem = ({ data }: musicProp) => {
  const dispatch = useDispatch()
  return (
    <div>
      <div className='grid grid-cols-3 gap-3'>
        {data?.slice(0, 12)?.map((item: art) => {
          return (
            <div
              key={item.encodeId}
              className='w-full col-span-1 flex items-center mb-5 gap-3 cursor-pointer hover:bg-[#2F2739] hover:rounded-lg hover:z-10'
            >
              <img
                src={item?.thumbnail}
                alt='avatar'
                className='w-[70px] h-[70px] rounded-sm'
                aria-hidden='true'
                onClick={() => {
                  dispatch(playMusic(true))
                  dispatch(musicId(item?.encodeId))
                }}
              />
              <div>
                <h3 className='text-[15px]'>{item.title}</h3>
                <p className='text-[13px] text-[hsla(0,0%,100%,0.5)]'>{item.artistsNames}</p>
                <p className='text-[13px] text-[hsla(0,0%,100%,0.5)]'>4 ngày trước</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SongItem
