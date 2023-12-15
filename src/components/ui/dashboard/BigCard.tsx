import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    datalabels: {
      display: false
    }
  }
}

const BigCard = ({ data }: any) => {
  const total = data.map((val: any) => val.count).reduce((acc: any, current: any) => acc + current, 0)

  const datasets = {
    labels: data.map((val: any) => val.type),
    datasets: [
      {
        label: 'Dataset 1',
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 61 })),
        data: data.map((val: any) => val.count),
        backgroundColor: '#F94144'
      }
    ]
  }

  return (
    <>
      <div className="text-xl font-semibold text-black "> DJPM</div>
      <div className="text-3xl font-semibold text-black "> {total}</div>
      <div className="text-sm text-gray-400 "> Perkembangan Data DJPM</div>
      <hr className="  mt-2 stroke-[#F0F0F0] stroke-2" />
      <div className=" w-full overflow-x-auto mt-8">
        <Bar options={options} data={datasets} />
      </div>
    </>
  )
}

export default BigCard
