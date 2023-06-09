import chartImage from '../../assets/imgs/bg-chart.jpg'
import { Line } from 'react-chartjs-2'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
import { Chart as ChartLibrary } from 'chart.js/auto'
const Chart = () => {
  const { chart, rank } = useSelector((state: RootState) => state.home)
  // console.log(chart)
  const [data, setData] = useState<any>(null)
  useEffect(() => {
    if (chart) {
      const labels = chart?.times?.filter((item) => +item.hour % 2 === 0)?.map((item) => item?.hour)
      const dataset = []
      for (let i = 0; i < 3; i++) {
        dataset.push({
          data: chart?.items[Object.keys(chart?.items)[i]]
            ?.filter((item: any) => +item.hour % 2 === 0)
            ?.map((item: any) => item.hour)
        })
      }
      setData({ labels, dataset })
    }
  }, [chart])
  console.log(data)
  return (
    <div className='relative'>
      <img src={chartImage} alt='chart' className='w-full rounded-lg object-contain ' />
      <div className='left-0 right-0 bottom-0 top-0 bg-gradient-to-t from-[#3F175C] to-[#3F175C] z-1 absolute'></div>
      <div className='top-0 left-0 right-0 bottom-0 absolute'>
        <h3 className='text-2xl text-[white]'>#zingchart</h3>
        <div className='grid grid-cols-10 gap-4 '>
          <div className='col-span-4'>rark</div>
          <div className='col-span-6'>{data && <Line data={data} />}</div>
        </div>
      </div>
    </div>
  )
}

export default Chart
