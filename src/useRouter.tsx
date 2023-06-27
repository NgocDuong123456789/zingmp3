import { useRoutes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { lazy, Suspense } from 'react'
import { path } from './contains/path'
import { LayoutMain } from './Layouts/LayoutMain'
// import  Home  from './pages/home/Home'
// import  NotFound  from './pages/NotFound/NotFound'
// import Album from './pages/Abum/Abum'
// import SearchAll from './pages/Search/Component/SearchAll/SearchAll'
// import { SearchSong } from './pages/Search/Component/SearchSong/SearchSong'
import LayoutSearch from './pages/Search/LayoutSearch/LayoutSearch'
// import { SearchMV } from './pages/Search/Component/SearchMV/SearchMV'
// import SearchPlayList from './pages/Search/Component/SearchPlayList/SearchPlayList'
//  import { SearchArtist } from './pages/Search/Component/SearchArtist/SearchArtist'
// import Artists from './pages/Artists/Artists'
// import Top100 from './pages/Top100/Top100'
const Home = lazy(() => import('./pages/home/Home'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))
const Top100 = lazy(() => import('./pages/Top100/Top100'))
const Artists = lazy(() => import('./pages/Artists/Artists'))
const Album = lazy(() => import('./pages/Abum/Abum'))
const SearchPlayList = lazy(() => import('./pages/Search/Component/SearchPlayList/SearchPlayList'))
const SearchArtist = lazy(() => import('./pages/Search/Component/SearchArtist/SearchArtist'))
const SearchAll = lazy(() => import('./pages/Search/Component/SearchAll/SearchAll'))
const SearchMV = lazy(() => import('./pages/Search/Component/SearchMV/SearchMV'))
const SearchSong = lazy(() => import('./pages/Search/Component/SearchSong/SearchSong'))
const Routes = () => {
  const router = useRoutes([
    {
      path: path.home,
      element: (
        <LayoutMain title='Zing MP3' description='Trang web nghe nhạc'>
          <Suspense fallback={<span>...Loading</span>}>
            <Home />
          </Suspense>
        </LayoutMain>
      )
    },
    {
      path: path.top,
      element: (
        <LayoutMain title='Top 100' description='Top những bài hát được nhiều người nghe nhất'>
          <Suspense fallback={<span>...Loading</span>}>
            <Top100 />
          </Suspense>
        </LayoutMain>
      )
    },

    {
      path: path.abum || path.playList,
      element: (
        <LayoutMain title='Những Bài Hát Hay Nhất'>
          <Suspense fallback={<span>...Loading</span>}>
            <Album />
          </Suspense>
        </LayoutMain>
      )
    },
    {
      path: path.Artists,
      element: (
        <LayoutMain title='Những Bài Hát Hay Nhất'>
          <Suspense fallback={<span>...Loading</span>}>
            <Artists />
          </Suspense>
        </LayoutMain>
      )
    },

    {
      path: path.searchSong,
      element: (
        <LayoutMain title='Những Bài Hát Hay Nhất'>
          <LayoutSearch />
        </LayoutMain>
      ),
      children: [
        {
          path: path.All,
          element: (
            <Suspense fallback={<span>...Loading</span>}>
              <SearchAll />
            </Suspense>
          )
        },
        {
          path: path.SONG,
          element: (
            <Suspense fallback={<span>...Loading</span>}>
              <SearchSong />
            </Suspense>
          )
        },
        {
          path: path.artist,
          element: (
            <Suspense fallback={<span>...Loading</span>}>
              <SearchArtist />
            </Suspense>
          )
        },
        {
          path: path.play,
          element: (
            <Suspense fallback={<span>...Loading</span>}>
              <SearchPlayList />
            </Suspense>
          )
        },
        {
          path: path.mv,
          element: (
            <Suspense fallback={<span>...Loading</span>}>
              <SearchMV />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <LayoutMain title='Trang không tồn tại'>
          <Suspense fallback={<span>...Loading</span>}>
            <NotFound />
          </Suspense>
        </LayoutMain>
      )
    }
  ])
  return router
}

export default Routes
