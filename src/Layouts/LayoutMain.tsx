import { Helmet } from 'react-helmet-async'

import  Sidebar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'
import { Player } from '~/components/Player/Player'
interface Props {
  children: React.ReactNode
  title: string
  description?: string
}
export const LayoutMain = ({ children, title, description }: Props) => {
  return (
    <div className='w-full grid grid-cols-12  '>
      <div className='col-span-2 '>
        <Sidebar />
      </div>
      <div className='col-span-10 '>
        <Header />
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content='React-Typescript' />
            <meta name='author' content='Hihi' />
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          </Helmet>
          {children}
        </div>
      </div>
      <div className=''>
        <Player />
      </div>
    </div>
  )
}
