import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import faker from 'faker'

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

const labels = [
  'Bilal Jenazah',
  'Penggali Kubur',
  'Nazir Mesjid',
  'Nazir Musholla',
  'Pengurus Gereja',
  'Pengurus Kuil/Klenteng /Vihara',
  'Imam Mesjid',
  'Khatib Jumat',
  'Ustadz',
  'Ustadzah',
  'Petugas Gereja Katolik',
  'Guru Maghrib Mengaji',
  'Guru Sekolah Minggu',
  'Guru Sekolah Budha',
  'Guru Sekolah Hindu',
  'Penatua'
]

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 61 })),
      backgroundColor: '#F94144'
    }
  ]
}

const BigCard = () => {
  return (
    <>
      <div className="text-xl font-semibold text-black "> DJPM</div>
      <div className="text-3xl font-semibold text-black "> 5.987,34</div>
      <div className="text-sm text-gray-400 "> Perkembangan Data DJPM</div>
      <hr className="  mt-2 stroke-[#F0F0F0] stroke-2" />
      <div className=" w-full overflow-x-auto mt-8">
        <Bar options={options} data={data} />
      </div>
    </>
  )
}

export default BigCard
