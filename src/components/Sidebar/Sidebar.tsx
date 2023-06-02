import { Link, useLocation } from 'react-router-dom'
import logomp3 from '../../assets/imgs/logo-zingmp3.png'
import { path } from '../../contains/path'
import classnames from 'classnames'
import { GenerateSideBar } from '../GenerateSideBar/GenerateSideBar'
import { Button } from '../Button/Button'
const Sidebar = () => {
  const location = useLocation()

  return (
    <nav className='w-full h-[100vh] bg-[#221A2D] text-[white] relative '>
      <Link to={path.home}>
        {' '}
        <div className='w-[200px] h-[65px]  m-auto '>
          <img src={logomp3} alt='logo music' className='w-full h-full object-contain pt-6' />
        </div>
      </Link>
      <div className='mt-[15px]'>
        <Link to={path.home}>
          <GenerateSideBar
            className={classnames('cursor-pointer flex items-center gap-3  py-3 ', {
              'bg-[#393142] border-l-2 border-[#9B4DE0]': location.pathname === path.home
            })}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 ml-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
            <p className='font-semibold'>Khám phá</p>
          </GenerateSideBar>
        </Link>
        <Link to={path.zingchart}>
          <GenerateSideBar
            className={classnames('cursor-pointer flex items-center gap-3  py-3 ', {
              'bg-[#393142] border-l-2 border-[#9B4DE0]': location.pathname === path.zingchart
            })}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 ml-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3'
              />
            </svg>

            <p className='font-semibold'>#zingchart</p>
          </GenerateSideBar>
        </Link>
        <Link to={path.radio}>
          <div
            className={classnames('cursor-pointer flex items-center gap-3  py-3 ', {
              'bg-[#393142] border-l-2 border-[#9B4DE0]': location.pathname === path.radio
            })}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 ml-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0'
              />
            </svg>

            <p className='font-semibold'>Radio</p>
          </div>
        </Link>

        <GenerateSideBar className=' cursor-pointer flex items-center gap-3  py-3 hover:bg-[#393142] hover:border-l-2 hover:border-[#9B4DE0]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 ml-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5'
            />
          </svg>

          <p className='font-semibold'>Thư viện</p>
        </GenerateSideBar>
      </div>
      <div className='w-[80%] h-[1px] m-auto my-[15px] bg-[#393142]'></div>

      <div>
        <Link to={path.newzing}>
          <GenerateSideBar
            className={classnames('cursor-pointer flex items-center gap-3  py-3 ', {
              'bg-[#393142] border-l-2 border-[#9B4DE0]': location.pathname === path.newzing
            })}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 ml-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z'
              />
            </svg>

            <p className='font-semibold'>Nhạc Mới</p>
          </GenerateSideBar>
        </Link>
        <Link to={path.hub}>
          <GenerateSideBar
            className={classnames('cursor-pointer flex items-center gap-3  py-3 ', {
              'bg-[#393142] border-l-2 border-[#9B4DE0]': location.pathname === path.hub
            })}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 ml-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z'
              />
            </svg>

            <p className='font-semibold'>Chủ đề và thể loại</p>
          </GenerateSideBar>
        </Link>
        <Link to={path.top}>
          {' '}
          <GenerateSideBar
            className={classnames('cursor-pointer flex items-center gap-3  py-3 ', {
              'bg-[#393142] border-l-2 border-[#9B4DE0]': location.pathname === path.top
            })}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 ml-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z'
              />
            </svg>

            <p className='font-semibold'>Top 100</p>
          </GenerateSideBar>
        </Link>
      </div>

      <div className='bg-[rgb(155,77,224)] text-[white] w-[80%] py-6 rounded-lg m-auto mt-[20px] flex flex-col items-center justify-center'>
        <span className='text-[15px] mb-[15px]'>Đăng nhập để khám phá playlist riêng cho bạn</span>

        <Button className='w-[80%]  h-[40px] outline-none border-2 rounded-full text-[15px]'>Đăng nhập</Button>
      </div>
      <GenerateSideBar className='cursor-pointer flex items-center gap-3  py-4  absolute bottom-0 border-t-2 border-[#393142] w-full'>
        {' '}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6 ml-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
        <p className='font-semibold'>Tạo playlist mới</p>
      </GenerateSideBar>
    </nav>
  )
}

export default Sidebar
