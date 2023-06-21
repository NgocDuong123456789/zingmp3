import { useState } from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { Banner } from '~/components/Banner/Banner'
import { Button } from '~/components/Button/Button'
import { Session } from '~/components/Session/Session'
import SongList from '~/components/SongList/SongList'
import { RootState } from '~/redux/store'
import { Scrollbars } from 'react-custom-scrollbars-2'


const Home = () => {
  const [valueButton, setValueButton] = useState<string>('all')
  const firdayData = useSelector((state: RootState) => state.home.friday)
  const newEveryMusic = useSelector((state: RootState) => state.home.newEveryMusic)
  const top100 = useSelector((state: RootState) => state.home.top100)
 
  const alBumHot = useSelector((state: RootState) => state.home?.alBumHot)
  const all = useSelector((state: RootState) => state.home?.newRelease?.items?.all)
  const others = useSelector((state: RootState) => state.home?.newRelease?.items?.others)
  const vPop = useSelector((state: RootState) => state.home?.newRelease?.items?.vPop)
  const isLoading=useSelector((state: RootState) => state.home?.isLoading)
  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    setValueButton(e.currentTarget.value)
  }
  const renderThumb = () => {
    const thumbStyle = {
      backgroundColor: '#4A4250',
      borderRadius: '8px',
      marginTop: '40px'
    }
    return <div style={{ ...thumbStyle }} />
  }
  return (
   
      <Scrollbars style={{ width: '100%', height: 700, marginTop: 50 }} renderThumbVertical={renderThumb}>
        <div className='p-[1.75rem] bg-[#170F23] text-[white] '>
          <Banner />
          <Session data={firdayData} />
          <Session data={newEveryMusic} />
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
            <SongList data={valueButton === 'all' ? all : valueButton == 'others' ? others : vPop} />
          </div>
          <Session data={top100} />
          <Session data={alBumHot} />
  
          <div className='mb-[100px] '></div>
        </div>
      </Scrollbars>)
  

}

export default Home
