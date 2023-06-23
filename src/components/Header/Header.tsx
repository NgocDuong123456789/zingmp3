import { useContext, useState, useRef } from 'react'
import { Link, useNavigate, createSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import debounce from 'lodash/debounce'

import { searchHistory } from '../../redux/SliceSearchHistory'
import { HeadlessTippy } from '../Tippy/Tippy'
import { Icons } from '../../helper/icons'
import { path } from '../../contains/path'
import { AppContext } from '~/useContext/Context'
import { GenerateSideBar } from '../GenerateSideBar/GenerateSideBar'
import { Button } from '../Button/Button'
import { searchSong } from '../../redux/SliceHome'
import { RootState, useAppDispatch } from '~/redux/store'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const dis = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const { authentication, profile } = useContext(AppContext)
  const [searchSongItem, setSearchSong] = useState<string>('')
  const dataSearchHistory = useSelector((state: RootState) => state?.music.searchHistory)
  console.log(dataSearchHistory)
  const debouncedSearch = debounce((query) => {
    console.log(`Searching for: ${query}`)
  }, 500)

  const handleSearchSong = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      dispatch(searchSong({ keyword: searchSongItem }))
      dis(searchHistory(searchSongItem))
      setIsInputFocused(false)
      navigate({
        pathname: `${path.searchSong}/${path.All}`,
        search: createSearchParams({
          q: searchSongItem
        }).toString()
      })
      if (inputRef.current) {
        inputRef.current.blur()
      }
    }
  }

  const handleFocus = () => {
    setIsInputFocused(true)
  }
  const handleBlur = () => {
    setIsInputFocused(false)
  }

  return (
    <header className='h-[75px] flex items-center justify-between bg-[#1F182B] text-[white] px-7 w-[83.33333%]  top-0 fixed z-20 '>
      <div className='flex items-center cursor-pointer'>
        <div className='flex items-center gap-3'>
          <Link to={path.home} className='hover:text-[#C273ED]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-7 h-7 '
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18' />
            </svg>
          </Link>
          <button onClick={() => navigate(-1)} className='hover:text-[#C273ED]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-7 h-7 mr-4 '
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3' />
            </svg>
          </button>
        </div>

        <div onBlur={handleBlur}>
          <div className='relative'>
            <input
              type='text'
              ref={inputRef}
              placeholder='Tìm kiếm bài hát, nghệ sĩ,lời bài hát...'
              className={`h-[40px] w-[350px] rounded-full pl-8  ${
                isInputFocused && searchSongItem !== '' ? ' bg-[#34224F] rounded-b-none rounded-t-2xl ' : 'bg-[#423C4B]'
              } outline-none`}
              onChange={(e) => {
                setSearchSong(e.target.value)
                debouncedSearch(e.target.value)
              }}
              onKeyUp={handleSearchSong}
              onFocus={handleFocus}
              value={searchSongItem}
            />

            <Icons.BsSearch
              size={18}
              className=' absolute left-[7px] top-[50%] text-[black] translate-y-[-50%] fill-[white] '
            />
          </div>
          {isInputFocused && searchSongItem !== '' && (
            <div className='text-[white] absolute top-[67px] bg-[#34224F]  w-[350px] flex flex-col rounded-b-xl mt-[-10px] z-20'>
              <h3 className='font-bold text-[15px] mx-3 mt-2 mb-3'>Tìm kiếm gần đây</h3>
              {dataSearchHistory?.searchHistory?.length > 0 &&
                dataSearchHistory?.searchHistory?.slice(-10).map((itemSearch: string, index: number) => {
                  return (
                    <div key={index}>
                      <div
                        className='flex items-center gap-3 pl-3 cursor-pointer hover:bg-[#170F23] '
                        aria-hidden='true'
                        onMouseDown={(e) => {
                          e.stopPropagation()
                          dispatch(searchSong({ keyword: itemSearch }))
                          navigate({
                            pathname: `${path.searchSong}/${path.All}`,
                            search: createSearchParams({
                              q: itemSearch
                            }).toString()
                          })
                          setSearchSong(itemSearch)
                          // setSearchSong('')
                        }}
                      >
                        <Icons.BiTrendingUp size={20} />
                        <span className='py-2'>{itemSearch}</span>
                      </div>
                    </div>
                  )
                })}
            </div>
          )}
        </div>
      </div>
      <div className='flex items-center cursor-pointer'>
        <div className='flex items-center text-[#C072EB]  gap-1 h-[40px] px-5 bg-[#2F2739] rounded-full  '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25'
            />
          </svg>
          <p className='font-bold'>Tải bản windows</p>
        </div>
        <HeadlessTippy
          childrenProps={
            <div className='w-[250px] bg-[#34224F] text-[white] rounded-lg font- text-[15px]'>
              <div className='flex item-center justify-between py-3 px-4 hover:bg-[hsla(0,0%,100%,0.1)] hover:rounded-lg'>
                <div className='flex items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
                    />
                  </svg>
                  <span>Trình phát nhạc</span>
                </div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </div>
              <div className='flex item-center justify-between py-3 px-4 hover:bg-[hsla(0,0%,100%,0.1)] hover:rounded-lg'>
                <div className='flex items-center  gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z'
                    />
                  </svg>

                  <span>Giao diện</span>
                </div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </div>
              <div className='w-[80%] h-[1px] bg-[#170F23] m-auto my-[0.5rem]'></div>
              <div className='flex item-center justify-between py-3 px-4 hover:bg-[hsla(0,0%,100%,0.1)] hover:rounded-lg'>
                <div className='flex items-center  gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z'
                    />
                  </svg>

                  <span>Giới thiệu</span>
                </div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25' />
                </svg>
              </div>
              <div className='flex item-center justify-between py-3 px-4 hover:bg-[hsla(0,0%,100%,0.1)] hover:rounded-lg'>
                <div className='flex items-center  gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5'
                    />
                  </svg>

                  <span>Liên hệ</span>
                </div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25' />
                </svg>
              </div>

              <GenerateSideBar className='header'>
                <div className='flex items-center  gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11.412 15.655L9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457L3 3m5.457 5.457l7.086 7.086m0 0L21 21'
                    />
                  </svg>

                  <span>Thỏa thuận sử dụng </span>
                </div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25' />
                </svg>
              </GenerateSideBar>

              <GenerateSideBar className='header'>
                <div className='flex items-center  gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
                    />
                  </svg>
                  <span>Quảng cáo</span>
                </div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25' />
                </svg>
              </GenerateSideBar>
            </div>
          }
        >
          <div className='bg-[#2F2739] rounded-[50%] p-2 mx-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              {' '}
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'
              />
              <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
            </svg>
          </div>
        </HeadlessTippy>

        <HeadlessTippy
          childrenProps={
            !authentication ? (
              <Link to={path.home}>
                <div className='bg-[#34224F] rounded-lg w-[350px] h-[70px] flex items-center justify-center'>
                  <Button className='text-[white] bg-[rgb(139,69,202)] h-[40px] w-[80%] rounded-full font-bold'>
                    Đăng Nhập
                  </Button>
                </div>
              </Link>
            ) : (
              <div>
                <Link to={path.home}>
                  <div className='w-[250px] bg-[#34224F] text-[white] rounded-lg font- text-[15px]'>
                    <div className='flex items-center gap-3 px-4  py-3 border-b-2 border-[#221A2D]'>
                      <img src={profile?.image} alt='avatar' className='w-[50px] h-[50px] object-cover' />

                      <span className='font-bold'>{profile?.user_name}</span>
                    </div>
                    <div className='flex item-center justify-between py-3 px-4 hover:bg-[hsla(0,0%,100%,0.1)] hover:rounded-lg'>
                      <div className='flex items-center  gap-2'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-6 h-6'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
                          />
                        </svg>

                        <span>Danh sách chặn</span>
                      </div>
                    </div>
                    <div className='flex item-center justify-between py-3 px-4 hover:bg-[hsla(0,0%,100%,0.1)] hover:rounded-lg'>
                      <div className='flex items-center  gap-2'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-6 h-6'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M11.412 15.655L9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457L3 3m5.457 5.457l7.086 7.086m0 0L21 21'
                          />
                        </svg>

                        <span>Tải lên</span>
                      </div>
                    </div>
                    <div className='flex item-center justify-between py-3 px-4 hover:bg-[hsla(0,0%,100%,0.1)] hover:rounded-lg'>
                      <div className='flex items-center  gap-2'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-6 h-6'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
                          />
                        </svg>

                        <span>Đăng Xuất</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          }
        >
          {!authentication ? (
            <div className='bg-[#2F2739] rounded-[50%] p-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <img src={profile?.image} alt='avatar' className='w-[40px] h-[40px] object-cover rounded-full' />
              <span className='text-[white]'>{profile?.user_name}</span>
            </div>
          )}
        </HeadlessTippy>
      </div>
    </header>
  )
}
export default Header
