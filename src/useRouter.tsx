import { useRoutes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import { path } from './contains/path'
import { LayoutMain } from './Layouts/LayoutMain'
import { Home } from './defaultPath'
import { NotFound } from './pages/NotFound/NotFound'
import { Abum } from './pages/Abum/Abum'
import SearchAll from './pages/Search/Component/SearchAll/SearchAll'
import { SearchSong } from './pages/Search/Component/SearchSong/SearchSong'
import LayoutSearch from './pages/Search/LayoutSearch/LayoutSearch'
import { SearchMV } from './pages/Search/Component/SearchMV/SearchMV'
import SearchPlayList from './pages/Search/Component/SearchPlayList/SearchPlayList'
import { SearchArtist } from './pages/Search/Component/SearchArtist/SearchArtist'
import Artists from './pages/Artists/Artists'
import Top100 from './pages/Top100/Top100'

const Routes = () => {
  const router = useRoutes([
    {
      path: path.home,
      element: (
        <LayoutMain title='Zing MP3' description='Trang web nghe nhạc'>
          <Home />
        </LayoutMain>
      )
    },
    {
      path: path.top,
      element: (
        <LayoutMain title='Top 100' description='Top những bài hát được nhiều người nghe nhất'>
          <Top100 />
        </LayoutMain>
      )
    },
   
    {
      path: path.abum || path.playList,
      element: (
        <LayoutMain title='Những Bài Hát Hay Nhất'>
          <Abum />
        </LayoutMain>
      )
    },
    {
      path: path.Artists,
      element: (
        <LayoutMain title='Những Bài Hát Hay Nhất'>
          <Artists />
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
          element: <SearchAll />
        },
        {
          path: path.SONG,
          element: <SearchSong />
        },
        {
          path: path.artist,
          element: <SearchArtist />
        },
        {
          path: path.play,
          element: <SearchPlayList />
        },
        {
          path: path.mv,
          element: <SearchMV />
        }
      ]
    },
    {
      path: '*',
      element: (
        <LayoutMain title='Trang không tồn tại'>
          <NotFound />
        </LayoutMain>
      )
    }
  ])
  return router
}

export default Routes
