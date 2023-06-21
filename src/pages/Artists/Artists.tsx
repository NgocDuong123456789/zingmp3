import { useSelector } from 'react-redux'
import { useState } from 'react'

import { Icons } from '~/helper/icons'
import { RootState } from '~/redux/store'
import AlbumItem from '~/components/AlbumItem/AlbumItem'
import ItemSong from '~/components/ItemSong/ItemSong'
import ArtisItem from '~/components/ArtisItem/ArtisItem'
import { convertLike } from '~/helper/utils'
import MVItem from '~/components/MVItem/MVItem'
import { art } from '~/redux/SliceHome'

const Artists = () => {
  const [codeId, setCodeId] = useState<string>('')
  const artists = useSelector((state: RootState) => state?.home?.artists)
  const outStandingSong = artists?.sections?.find((item) => item?.sectionId === 'aSongs')
  const Single = artists?.sections?.find((item) => item?.sectionId === 'aSingle')
  const aReArtist = artists?.sections?.find((item) => item?.sectionId === 'aReArtist')
  const mv = artists?.sections?.find((item) => item?.sectionId === 'aMV')

  return (
    <div className='pt-[70px]'>
      <div className='flex items-center  bg-[#504067]  py-[30px] text-[white] px-[1.75rem] gap-4'>
        <div>
          <img src={artists?.thumbnail} alt='ảnh ca sĩ' className='w-full rounded-full object-cover' />
        </div>
        <div>
          <div className='flex items-center gap-4'>
            <span className='text-[25px] text-bold'>{artists?.name}</span>
            <span className='bg-[#9B4DE0] p-2 rounded-full'>
              <Icons.BsFillPlayFill size={30} />
            </span>
          </div>
          <p>{artists?.follow} người quan tâm</p>
        </div>
      </div>
      <div className='bg-[#170F23] px-[1.75rem] text-[white]  pt-[30px]'>
        <h2 className='text-[18px] font-bold py-4'>BÀI HÁT</h2>
        {(outStandingSong?.items as art[])?.length > 0 ? (
          outStandingSong?.items.slice(0, 10).map((item, index) => {
            return (
              <AlbumItem
                codeId={codeId}
                setCodeId={setCodeId}
                key={index}
                encodeId={item.encodeId}
                title={item.title}
                duration={item?.duration as number}
                thumbnail={item.thumbnail}
                albumTitle={item?.album?.title as string}
                artistsNames={item.artistsNames}
              />
            )
          })
        ) : (
          <div className='h-[30vh] flex  justify-center items-center m-auto w-full bg-[#2F2739] rounded-lg'>
            <div className='w-full flex flex-col items-center'>
              <Icons.GiLoveSong size={50} />
              <p className='mt-4'>Không có bài hát nào được tìm thấy</p>
            </div>
          </div>
        )}
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
        {(aReArtist?.items as art[])?.length > 0 ? (
          <div className='grid grid-cols-5 gap-4'>
            {aReArtist?.items?.slice(0, 5)?.map((item) => {
              return (
                <ArtisItem
                  key={item.id}
                  encodeId={item.id as string}
                  thumbnail={item.thumbnail}
                  link={item.link}
                  name={item.name as string}
                  alias={item.alias as string}
                  totalFollow={convertLike(item?.totalFollow as number) as number}
                />
              )
            })}
          </div>
        ) : (
          <div className='h-[30vh] flex  justify-center items-center m-auto w-full bg-[#2F2739] rounded-lg'>
            <div className='w-full flex flex-col items-center'>
              <Icons.GiLoveSong size={50} />
              <p className='mt-4'>Không có nghệ sĩ/OA nào được tìm thấy</p>
            </div>
          </div>
        )}
      </div>
      <div className='pb-[150px] text-[white] bg-[#170F23] px-[1.75rem]'>
        <h2 className='text-[18px] font-bold py-4'>MV</h2>
        {(mv?.items as art[])?.length > 0 ? (
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
        ) : (
          <div className='h-[30vh] flex  justify-center items-center m-auto w-full bg-[#2F2739] rounded-lg'>
            <div className='w-full flex flex-col items-center'>
              <Icons.GiLoveSong size={50} />
              <p className='mt-4'>Không có MV nào được tìm thấy</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Artists
