import { useRoutes } from 'react-router-dom'
import { path } from './contains/path'
import { LayoutMain } from './Layouts/LayoutMain'
import { Home, Login, Register } from './defaultPath'
import { NotFound } from './pages/NotFound/NotFound'
import { Abum } from './pages/Abum/Abum'
import SearchAll from './pages/Search/Component/SearchAll/SearchAll'
import { SearchSong } from './pages/Search/Component/SearchSong/SearchSong'
import LayoutSearch from './pages/Search/LayoutSearch/LayoutSearch'
import { SearchMV } from './pages/Search/Component/SearchMV/SearchMV'
import SearchPlayList from './pages/Search/Component/SearchPlayList/SearchPlayList'
import { SearchArtist } from './pages/Search/Component/SearchArtist/SearchArtist'
const Routes = () => {
  const router = useRoutes([
    {
      path: path.home,
      element: (
        <LayoutMain>
          <Home />
        </LayoutMain>
      )
    },
    {
      path: path.login,
      element: <Login />
    },
    {
      path: path.register,
      element: <Register />
    },
    {
      path: path.abum || path.playList,
      element: (
        <LayoutMain>
          <Abum />
        </LayoutMain>
      )
    },

    {
      path: path.searchSong,
      element: (
        <LayoutMain>
          <LayoutSearch />
        </LayoutMain>
      ),
      children: [
        {
          path: path.All,
          element: <SearchAll />
        }
        ,
        {
          path: path.SONG,
          element: <SearchSong />
        },{
          path: path.artist,
          element: <SearchArtist />
          
        },{
          path: path.play,
          element: <SearchPlayList />
          
        },{
          path: path.mv,
          element: <SearchMV />
          
        }
      ]
    },
    {
      path: '*',
      element: (
        <LayoutMain>
          <NotFound />
        </LayoutMain>
      )
    }
  ])
  return router
}

export default Routes
