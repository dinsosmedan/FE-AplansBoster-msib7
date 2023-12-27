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
        <div className="my-5">
          <Skeleton className="w-[300px] h-[300px] rounded-full" />
        </div>
      ) : (
        <LongCard.Chart data={value} label={label} backgroundColor={['#F94144', '#F3722C']} />
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
        <div className="my-5">
          <Skeleton className="w-[300px] h-[300px] rounded-full" />
        </div>
      ) : (
        <LongCard.Chart data={value} label={label} backgroundColor={['#F94144', '#F3722C', '#F9C74F']} />
      )}
    </LongCard>
  )
}
const ChartPenanganan = () => {
  const { data, isLoading } = useVulnerableGroup()

  const total = data ? data.map((val: any) => val.count) : []
  const label = data ? data.map((val: any) => val.budgetYear.toString()) : []

  return (
    <>
      <LongCard props={['Penangan Kelompok Rentan', 'Perkembangan Data PKR']}>
        {isLoading ? (
          <>
            <div className="my-5">
              <Skeleton className="w-[300px] h-[300px] rounded-full" />
            </div>
          </>
        ) : (
          <LongCard.Chart
            data={total}
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
          <div className="grid grid-cols-3 gap-5 mt-5">
            {[...Array(3)].map((_, i) => (
              <div className="rounded-xl bg-white p-4" key={i}>
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-[120px] h-3 rounded-[14px]" />
                  <Skeleton className="w-[80px] h-3 rounded-[14px]" />
                  <Skeleton className="w-[80px] h-3 rounded-[14px]" />
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {[...Array(3)].map((_, i) => (
              <div className="rounded-xl bg-white p-4" key={i}>
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-[120px] h-3 rounded-[14px]" />
                  <Skeleton className="w-[80px] h-3 rounded-[14px]" />
                  <Skeleton className="w-[80px] h-3 rounded-[14px]" />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-5 mt-5">
            <BasicCard props={['Bantuan Biaya Pendidikan', data.tuitionAssistance, 'Data']} />
            <BasicCard props={['Total Penangan Kelompok Rentan', data.vulnerableGroupHandling, 'Data']} />
            <BasicCard props={['Total SKTM', data.indigencyCertificate, 'Data']} />
          </div>
          <div className="grid grid-cols-3 gap-5 mt-5">
            <BasicCard props={['Bantuan PBI', data.premiumAssistanceBeneficiary, 'Data']} />
            <BasicCard props={['Total PKH', data.familyHopeProgram, 'Data']} />
            <BasicCard props={['Total Unregister Terdaftar', data.unregister, 'Data']} />
          </div>
        </>
      )}
    </>
  )
}

export default SectionLinjamsos
