import { Banner } from '~/components/Banner/Banner'
import { Session } from '~/components/Session/Session'

const Home = () => {
  return (
    <div className='p-[1.75rem] bg-[#170F23] text-[white] '>
      <Banner />
      <Session />
    </div>
  )
}

export default Home
