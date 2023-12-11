import { Loading } from '@/components'
import LongCard from '@/components/ui/dashboard/LongCard'
import TitleSign from '@/components/ui/dashboard/TitleSign'
import { Skeleton } from '@/components/ui/skeleton'
import { useVulnerableGroup } from '@/store/server'

const SectionLinjamsos = () => {
  return (
    <>
      <div className=" my-12 ">
        <TitleSign text={' Linjamsos '} />

        {/* <CardData />
        <div className="grid grid-cols-3 gap-5 mt-5">
          <LongCard props={['Data DTKS', 'Persentasi Data DTKS']}>
            <LongCard.Chart
              data={[12, 19]}
              isPercent={true}
              label={['DTKS', 'Non DTKS']}
              backgroundColor={['#F94144', '#F3722C']}
            />
          </LongCard>
          <LongCard props={['Jenis Kelamin', 'Persentasi Data DTKS Berdasarkan Jenis Kelamin']}>
            <LongCard.Chart
              data={[30, 15]}
              isPercent={true}
              label={['Laki-laki', 'Perempuan']}
              backgroundColor={['#F94144', '#F3722C']}
            />
          </LongCard>
          <LongCard props={['Prevalensi DTKS Perkecamatan', 'Prevalensi DTKS Perkecamtan']}>
            <LongCard.Tabel />
          </LongCard>
        </div> */}
        <div className="grid grid-cols-3 gap-5 mt-5">
          <ChartPenanganan />
          <ChartBbp />
          <ChartSktm />

        </div>
      </div>
    </>
  )
}
const ChartSktm = () => {

  return (
    <LongCard props={['SKTM', 'Persentasi Data SKTM Berdasarkan DTKS']}>
      <LongCard.Chart
        data={[30, 15]}
        isPercent={true}
        label={['DTKS', 'Non DTKS']}
        backgroundColor={['#F94144', '#F3722C']}
      />
    </LongCard>
  )
}
const ChartBbp = () => {

  return (
    <LongCard props={['Bantuan Biaya Pendidikan', 'Persentasi Data Biaya Pendidikan']}>
      <LongCard.Chart
        data={[20, 5, 13]}
        isPercent={true}
        label={['Diterima', 'Diterima', 'Prelist']}
        backgroundColor={['#F94144', '#F3722C', '#F9C74F']}
      />
    </LongCard>
  )
}
const ChartPenanganan = () => {
  const { data, isLoading } = useVulnerableGroup()

  if (isLoading) return <Loading />
  // const total = data.map((val: any) => val.count)
  const label = data.map((val: any) => val.budgetYear.toString())
  // const values = Object.values(data)

  // console.log(total)
  return (
    <>
      <LongCard props={['Penangan Kelompok Rentan', 'Perkembangan Data PKR']}>
        {
          isLoading ? (
            <>
              <Skeleton className="w-[300px] h-[300px] rounded-full" />
            </>
          ) :
            <LongCard.Chart
              data={[12, 21, 22, 31, 21]}
              label={label}
              backgroundColor={['#F94144', '#F3722C', '#F9C74F', '#90BE6D', '#F8961E']}
            />
        }
      </LongCard>
    </>
  )
}
// const CardData = () => {
//   return (
//     <>
//       <div className="grid grid-cols-3 gap-5 mt-5">
//         <BasicCard props={['Bantuan Biaya Pendidikan', '705.262', 'Data']} />
//         <BasicCard props={['Total Penangan Kelompok Rentan', '705.262', 'Data']} />
//         <BasicCard props={['Total SKTM', '705.262', 'Data']} />
//       </div>
//       <div className="grid grid-cols-2 gap-5 mt-5">
//         <BasicCard props={['Bantuan PBI', '705.262', 'Data']} />
//         <BasicCard props={['Total PKH', '705.262', 'Data']} />
//       </div>
//       <div className="grid grid-cols-3 gap-5 mt-5">
//         <BasicCard props={['Total Data DTKS', '705.262', 'Data']} />
//         <BasicCard props={['Jumlah data Non DTKS', '705.262', 'Data']} />
//         <BasicCard props={['Jumlah Keluarga Penerima', '705.262', 'Data']} />
//       </div>
//     </>
//   )
// }

export default SectionLinjamsos
