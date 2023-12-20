import BasicCard from '@/components/ui/dashboard/BasicCard'
import LongCard from '@/components/ui/dashboard/LongCard'
import TitleSign from '@/components/ui/dashboard/TitleSign'
import { Skeleton } from '@/components/ui/skeleton'
import {
  useCountBbp,
  useCountIndigencyCertificate,
  useCountTuitionAssistance,
  useVulnerableGroup
} from '@/store/server'

const SectionLinjamsos = () => {
  return (
    <>
      <div className=" my-12 ">
        <TitleSign text={' Linjamsos '} />

        <CardData />
        {/* <div className="grid grid-cols-3 gap-5 mt-5">
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
  const { data, isLoading } = useCountIndigencyCertificate()

  const label = data ? data.map((val: any) => val.budgetYear.toString()) : []
  const value = data ? data.map((val: any) => val.count.toString()) : []

  return (
    <LongCard props={['SKTM', 'Persentasi Data SKTM Berdasarkan DTKS']}>
      {isLoading ? (
        <Skeleton className="w-[300px] h-[300px] rounded-full" />
      ) : (
        <LongCard.Chart
          // data={[30, 15]}
          data={value}
          isPercent={true}
          // label={['DTKS', 'Non DTKS']}
          label={label}
          backgroundColor={['#F94144', '#F3722C']}
        />
      )}
    </LongCard>
  )
}
const ChartBbp = () => {
  const { data, isLoading } = useCountTuitionAssistance()

  const label = data ? data.map((val: any) => val.budgetYear.toString()) : []
  const value = data ? data.map((val: any) => val.count.toString()) : []

  return (
    <LongCard props={['Bantuan Biaya Pendidikan', 'Persentasi Data Biaya Pendidikan']}>
      {isLoading ? (
        <Skeleton className="w-[300px] h-[300px] rounded-full" />
      ) : (
        <LongCard.Chart
          // data={[20, 5, 13]}
          data={value}
          isPercent={true}
          // label={['Diterima', 'Diterima', 'Prelist']}
          label={label}
          backgroundColor={['#F94144', '#F3722C', '#F9C74F']}
        />
      )}
    </LongCard>
  )
}
const ChartPenanganan = () => {
  const { data, isLoading } = useVulnerableGroup()

  // if (isLoading) return <Loading />
  // const total = data.map((val: any) => val.count)
  const label = data ? data.map((val: any) => val.budgetYear.toString()) : []
  // const values = Object.values(data)

  return (
    <>
      <LongCard props={['Penangan Kelompok Rentan', 'Perkembangan Data PKR']}>
        {isLoading ? (
          <>
            <Skeleton className="w-[300px] h-[300px] rounded-full" />
          </>
        ) : (
          <LongCard.Chart
            data={[12, 21, 22, 31, 21]}
            label={label}
            backgroundColor={['#F94144', '#F3722C', '#F9C74F', '#90BE6D', '#F8961E']}
          />
        )}
      </LongCard>
    </>
  )
}
const CardData = () => {
  const { data, isLoading } = useCountBbp()

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton className="w-12 h-12 rounded-[14px]" />
          <div className="flex flex-col gap-3">
            <Skeleton className="w-[120px] h-3 rounded-[14px]" />
            <Skeleton className="w-[80px] h-3 rounded-[14px]" />
            <Skeleton className="w-[80px] h-3 rounded-[14px]" />
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-5 mt-5">
            <BasicCard props={['Bantuan Biaya Pendidikan', data.premiumAssistanceBeneficiary, 'Data']} />
            <BasicCard props={['Total Penangan Kelompok Rentan', data.vulnerableGroupHandling, 'Data']} />
            <BasicCard props={['Total SKTM', data.indigencyCertificate, 'Data']} />
          </div>
          <div className="grid grid-cols-2 gap-5 mt-5">
            <BasicCard props={['Bantuan PBI', data.tuitionAssistance, 'Data']} />
            <BasicCard props={['Total PKH', data.familyHopePrograms, 'Data']} />
          </div>
        </>
      )}
    </>
  )
}

export default SectionLinjamsos
