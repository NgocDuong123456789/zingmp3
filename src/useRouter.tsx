import {useRoutes} from 'react-router-dom'
import {path} from './contains/path'
import {LayoutMain} from './Layouts/LayoutMain'
import { Home, Login, Register ,NotFound} from './defaultPath'

const Routes =()=>{
  const router=useRoutes([
    {
      path:path.home,
      element:<LayoutMain><Home /></LayoutMain>
    },
    {
      path:path.home,
      element:<LayoutMain><Login /></LayoutMain>
    },
    {
      path:path.home,
      element:<LayoutMain><Register /></LayoutMain>
    },
    {
      path:'*',
      element:<LayoutMain><NotFound /></LayoutMain>
    },

  ])
  return router;
}

export default Routes