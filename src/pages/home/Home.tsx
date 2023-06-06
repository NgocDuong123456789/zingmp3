import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Banner } from '~/components/Banner/Banner'
import { Button } from '~/components/Button/Button'
import { Session } from '~/components/Session/Session'
import SongItem from '~/components/SongItem/SongItem'
import { RootState } from '~/redux/store'
import classNames from 'classnames'

const array = {
  all: 'TẤT CẢ',
  others: 'OTHERS',
  vPop: 'VPOP'
}

const Home = () => {
  
  const [valueButton, setValueButton] = useState<string>('all')
  const firdayData = useSelector((state: RootState) => state.home.friday)
  const newEveryMusic = useSelector((state: RootState) => state.home.newEveryMusic)
  const top100 = useSelector((state: RootState) => state.home.top100)
  const alBumHot = useSelector((state: RootState) => state.home.alBumHot)
  const all = useSelector((state: RootState) => state.home.newRelease.items.all)
  const others = useSelector((state: RootState) => state.home.newRelease.items.others)
  const vPop = useSelector((state: RootState) => state.home.newRelease.items.vPop)

  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    setValueButton(e.currentTarget.value)
  }
  return (
    <div className='p-[1.75rem] bg-[#170F23] text-[white] '>
      <Banner />
      <Session data={firdayData} />
      <Session data={newEveryMusic} />
      <Session data={top100} />
      <Session data={alBumHot} />

      <div className='mt-[50px]'>
        <h3 className='text-[20px] font-bold'>Mới Phát Hành</h3>
        <div className='py-6'>
          <Button
            onClick={handleClickButton}
            className={classNames(
              'w-[100px] h-[30px] rounded-2xl border-[hsla(0,0%,100%,0.1)] border mr-3 text-[white]',
              {
                'bg-[#9B4DE0]': valueButton === 'all'
              }
            )}
            value='all'
          >
            TẤT CẢ
          </Button>
          <Button
            onClick={handleClickButton}
            className={classNames(
              'w-[100px] h-[30px] rounded-2xl border-[hsla(0,0%,100%,0.1)] border mr-3 text-[white]',
              {
                'bg-[#9B4DE0]': valueButton === 'others'
              }
            )}
            value='others'
          >
            OTHERS
          </Button>
          <Button
            onClick={handleClickButton}
            className={classNames(
              'w-[100px] h-[30px] rounded-2xl border-[hsla(0,0%,100%,0.1)] border mr-3 text-[white]',
              {
                'bg-[#9B4DE0]': valueButton === 'vPop'
              }
            )}
            value='vPop'
          >
            VPOP
          </Button>
        </div>
        <SongItem data={valueButton === 'all' ? all : valueButton == 'others' ? others : vPop} />
      </div>
      <div className='mb-[100px] '></div>
    </div>
  )
}

export default Home
