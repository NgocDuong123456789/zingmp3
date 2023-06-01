import { useRoutes } from 'react-router-dom'
import { path } from './contains/path'
import { LayoutMain } from './Layouts/LayoutMain'
import { Home, Login, Register } from './defaultPath'

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
  ])
  return router
}

export default Routes
