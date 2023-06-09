import React from 'react'
interface TypeProp{
  title: string ,
  artistsNames:string
  thumbnail: string
}
const OutSandSong = ({title, artistsNames,  thumbnail}:TypeProp) => {
  return (
   <div>
     <div className='flex items-center gap-3 bg-[#2F2739] rounded-lg cursor-pointer  col-span-1'>
      <div>
        <img src={ thumbnail} alt="bài hát nổi bật" className="w-[100px] h-[100px] rounded-sm" />
      </div>
      <div >
        <p className='text-[#78747F]'>Bài hát</p>
        <h3 className='text-[white] font-semibold'>{title}</h3>
        <p className='text-[#78747F]'>{artistsNames}</p>
      </div>
    </div>
   </div>
  )
}

export default OutSandSong