import { Outlet } from 'react-router-dom'
import SearchBar from './SearchBar'
const LayoutSearch = () => {
  return (
    <div>
      <SearchBar />
      <Outlet />
    </div>
  )
}

export default LayoutSearch
