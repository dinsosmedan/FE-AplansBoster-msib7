import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import 'chartjs-plugin-datalabels'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)
// Chart.register(ChartDataLabels);

export const data = {
  labels: ['DTKS', 'Non DTKS'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19],
      backgroundColor: ['#F94144', '#F3722C'],
      datalabels: {
        color: 'white'
      }
    }
  ]
}
export const UserData = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234
  }
]
// const options = {
//     plugins: {
//         legend: {
//             labels: {
//                 position: 'bottom'
//             }
//         }
//     }
// };
// const options = {
//     plugins: {
//         legend: {
//             position: 'bottom'
//         },
//         datalabels: {
//             display: true,
//             color: "white"
//         }
//     }
// };

// export default function CardLink({ children, className }: CardLayananProps) {
//     return (
//       <article
//         className={cn('w-[385px] h-fit flex flex-col rounded-[20px] border border-primary overflow-hidden', className)}
//       >
//         {children}
//       </article>
//     )
//   }

const LongCard = ({ props, children }: any) => {
  const [title, description] = props

  return (
    <>
      <div className="rounded-xl bg-white ">
        <div className="flex flex-col gap-2 p-4">
          <div className="text-xl font-semibold text-black ">{title}</div>
          <div className="text-sm text-gray-400 ">{description}</div>
        </div>
        <hr className="bg-transparent mt-2  " />

        <div className="flex justify-center">{children}</div>
      </div>
    </>
  )
}

const Chart = ({ data, label, backgroundColor, isPercent }: any) => {
  const datalabel = {
    // labels: ['DTKS', 'Non DTKS'],
    labels: label,
    datasets: [
      {
        label: '# of Votes',
        data,
        backgroundColor,
        datalabels: {
          color: 'white'
        }
      }
    ]
  }
  return (
    <>
      <div className=" w-[300px] my-5">
        <Pie
          options={{
            plugins: {
              tooltip: { callbacks: { label: (item) => `${item.label}: ${item.formattedValue} %` } },
              legend: { position: 'bottom', labels: { usePointStyle: true, pointStyle: 'circle' } },
              datalabels: { display: true, color: 'white', formatter: (item) => `${item} ${isPercent ? '%' : ' '}` }
            }
          }}
          data={datalabel}
        />
      </div>
    </>
  )
}

const Tabel = () => {
  return (
    <>
      <div className=" w-[340px] my-5">
        <Table>
          <TableHeader className="bg-primary">
            <TableRow>
              <TableHead className="text-black bg-white">No</TableHead>
              <TableHead className="text-black bg-white">Nama Kecamatan</TableHead>
              <TableHead className="text-black bg-white">Jumlah Penduduk </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center bg-zinc-100/50">1</TableCell>
              <TableCell className="text-center bg-zinc-100/50">Hura Asli</TableCell>
              <TableCell className="text-center bg-zinc-100/50">Medan Amplas</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center bg-zinc-100/50">2</TableCell>
              <TableCell className="text-center bg-zinc-100/50">Hura Asli</TableCell>
              <TableCell className="text-center bg-zinc-100/50">Medan Amplas</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center bg-zinc-100/50">3</TableCell>
              <TableCell className="text-center bg-zinc-100/50">Hura Asli</TableCell>
              <TableCell className="text-center bg-zinc-100/50">Medan Amplas</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center bg-zinc-100/50">4</TableCell>
              <TableCell className="text-center bg-zinc-100/50">Hura Asli</TableCell>
              <TableCell className="text-center bg-zinc-100/50">Medan Amplas</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center bg-zinc-100/50">5</TableCell>
              <TableCell className="text-center bg-zinc-100/50">Hura Asli</TableCell>
              <TableCell className="text-center bg-zinc-100/50">Medan Amplas</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  )
}

LongCard.Chart = Chart
LongCard.Tabel = Tabel

export default LongCard
