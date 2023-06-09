import { useSelector } from 'react-redux'
import { Icons } from '~/helper/icons'
import { RootState } from '~/redux/store'
import OutSandSong from '../Search/Component/OutStandSong/OutSandSong'
import AlbumItem from '~/components/AlbumItem/AlbumItem'
import { songProp } from '~/types/song.types'
import ItemSong from '~/components/ItemSong/ItemSong'
import ArtisItem from '~/components/ArtisItem/ArtisItem'
import { convertLike } from '~/helper/utils'
import MVItem from '~/components/MVItem/MVItem'
const Artists = () => {
  const {name,totalFollow , follow , thumbnail,thumbnailM, sections}= useSelector((state: RootState) => state.home.artists)
  const outStandingSong= sections.find(item=>item.title==="Bài hát nổi bật")
  const Single=sections.find(item=>item.title==="Single & EP")
  const aReArtist=sections.find(item=>item.title==="Bạn Có Thể Thích")
  const mv=sections.find(item=>item.title==="MV")
  console.log(sections)
 

  return (
    <div className='pt-[70px]'>
      <div className='flex items-center  bg-[#504067]  py-[30px] text-[white] px-[1.75rem] gap-4'>
        <div>
          <img
            src={thumbnail}
            alt='ảnh ca sĩ'
            className='w-full rounded-full object-cover'
          />
        </div>
        <div>
          <div className='flex items-center gap-4'>
            <span className='text-[25px] text-bold'>{name}</span>
            <span className='bg-[#9B4DE0] p-2 rounded-full'>
              <Icons.BsFillPlayFill size={30} />
            </span>
          </div>
          <p>{follow} người quan tâm</p>
        </div>
      </div>
      <div className='bg-[#170F23] px-[1.75rem] text-[white] pb-[50px] pt-[30px]'>
       <h2 className='text-[18px] font-bold py-4'>BÀI HÁT</h2>
      {outStandingSong?.items.slice(0,10).map((item , index) => {
        return (
          <AlbumItem
            key={index}
            encodeId={item.encodeId}
            title={item.title}
            duration={item?.duration as number}
            thumbnail={item.thumbnail}
            albumTitle={item?.album?.title as string}
            artistsNames={item.artistsNames}
          />
        )
      })}
    </div>
    <div className='pb-[30px] bg-[#170F23] text-[white] px-[1.75rem]'>
        <h2 className='text-[18px] font-bold py-4'>{Single?.title}</h2>
        <div className='grid grid-cols-5 gap-4'>
          {Single?.items?.slice(0, 10)?.map((item) => {
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
     <div className='pb-[30px] text-[white] bg-[#170F23] px-[1.75rem]'>
        <h2 className='text-[18px] font-bold py-4'>Nghệ Sĩ/OA</h2>
        <div className='grid grid-cols-5 gap-4'>
          {aReArtist?.items?.slice(0, 5)?.map(item => {
            return (
              <ArtisItem
                key={item.id}
                encodeId={item.id as string}
                thumbnail={item.thumbnail}
                link={item.link}
                name={item.name as string}
                alias={item.alias as string}
                totalFollow={convertLike(item.totalFollow as number) as number}
              />
            )
          })}
        </div>
      </div> 
      <div className='pb-[150px] text-[white] bg-[#170F23] px-[1.75rem]'>
        <h2 className='text-[18px] font-bold py-4'>MV</h2>
        <div className='grid grid-cols-3 gap-4'>
          {mv?.items?.slice(0, 3)?.map((item) => {
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
      </div>  

    </div>
  )
}

export default Artists
