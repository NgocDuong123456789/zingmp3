import { useRoutes } from 'react-router-dom'
import { path } from './contains/path'
import { LayoutMain } from './Layouts/LayoutMain'
import { Home, Login, Register } from './defaultPath'
import { NotFound } from './pages/NotFound/NotFound'

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
      element: (
       
          <Login />
      
      )
    },
    {
      path: path.register,
      element: <Register />
    }
    ,
    {
      path:"*",
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
