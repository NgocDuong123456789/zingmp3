import { Link, createSearchParams, useLocation } from 'react-router-dom'
import classNames from 'classnames'

const SearchBar = () => {
  const location = useLocation()
  return (
    <div className='text-[white] pt-[100px] pb-[30px] bg-[#170F23] '>
      <div className='flex items-center  border-b-2 border-[rgba(41,21,71,0.8)]  px-10 gap-10 '>
        <h1 className='border-r-2 border-[rgba(41,21,71,0.3) px-5'>KẾT QUẢ TÌM KIẾM</h1>
        <Link
          to={{
            pathname: '/tim-kiem/tat-ca',
            search: createSearchParams({
              q: '1'
            }).toString()
          }}
          className={classNames('', {
            'border-b-2 border-[#9B4DE0] py-4': location.pathname === '/tim-kiem/tat-ca'
          })}
        >
          TẤT CẢ
        </Link>
        <Link
          to={{
            pathname: '/tim-kiem/bai-hat',
            search: createSearchParams({
              q: '1'
            }).toString()
          }}
          className={classNames('', {
            'border-b-2 border-[#9B4DE0] py-4': location.pathname === '/tim-kiem/bai-hat'
          })}
        >
          BÀI HÁT
        </Link>
        <Link
          to={{
            pathname: '/tim-kiem/playlist',
            search: createSearchParams({
              q: '1'
            }).toString()
          }}
          className={classNames('', {
            'border-b-2 border-[#9B4DE0] py-4': location.pathname === '/tim-kiem/playlist'
          })}
        >
          PLAYLIST/ALBUM
        </Link>
        <Link
          to={{
            pathname: '/tim-kiem/artist',
            search: createSearchParams({
              q: '1'
            }).toString()
          }}
          className={classNames('', {
            'border-b-2 border-[#9B4DE0] py-4': location.pathname === '/tim-kiem/artist'
          })}
        >
          NGHỆ SĨ/OA
        </Link>
        <Link
          to={{
            pathname: '/tim-kiem/video',
            search: createSearchParams({
              q: '1'
            }).toString()
          }}
          className={classNames('', {
            'border-b-2 border-[#9B4DE0] py-4': location.pathname === '/tim-kiem/video'
          })}
        >
          MV
        </Link>
      </div>
    </div>
  )
}

export default SearchBar
