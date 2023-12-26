import BasicCard from '@/components/ui/dashboard/BasicCard'
import BigCard from '@/components/ui/dashboard/BigCard'
import LongCard from '@/components/ui/dashboard/LongCard'
import TitleSign from '@/components/ui/dashboard/TitleSign'
import { Skeleton } from '@/components/ui/skeleton'
import {
  useBusinessGroupAssistance,
  useCommunityGroupAssistance,
  useCountDataDayasos,
  useCountServiceFund,
  useDataWorshipPlace
} from '@/store/server'

const SectionDayasos = () => {
  return (
    <>
      <div className=" my-12 ">
        <TitleSign text={'Dayasos '} />

        <CardData />

        <div className="rounded-xl bg-white mt-5 px-8 py-5 flex flex-col gap-1">
          <CardDjpm />
        </div>
        <div className="grid grid-cols-3 gap-5 mt-5">
          <ChartPokmas />
          <ChartKube />
          <ChartRi />
        </div>
      </div>
    </>
  )
}
const CardData = () => {
  const { data, isLoading } = useCountDataDayasos()

  // if (isLoading) return <Loading />

  // const { veteran, serviceFund, worshipPlace, organizationGrantAssistance, jointBusinessGroupAssistance, communityGroupAssistance, fuelCashAssistance, nonCashFoodAssistance } = data

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
          <div className="grid grid-cols-4 gap-5 mt-5">
            <BasicCard props={['Total Jumlah Data Veteran', data.veteran, 'Jiwa']} />
            <BasicCard props={['Total DJPM Terdaftar', data.serviceFund, 'Data']} />
            <BasicCard props={['Total Rumah Ibadah ', data.worshipPlace, 'Data']} />
            <BasicCard props={['Total BHO Yang Terdaftar', data.organizationGrantAssistance, 'Organisasi/Lembaga']} />
          </div>
          <div className="grid grid-cols-4 gap-5 mt-5">
            <BasicCard props={['Total KUBE Terdaftar', data.jointBusinessGroupAssistance, 'Data']} />
            <BasicCard props={['Total POKMAS Terdaftar', data.communityGroupAssistance, 'Data']} />
            <BasicCard props={['Total BLTBBM ', data.fuelCashAssistance, 'Data']} />
            <BasicCard props={['Total BPNT', data.nonCashFoodAssistance, 'Organisasi/Lembaga']} />
          </div>
        </>
      )}
    </>
  )
}

const CardDjpm = () => {
  const { data, isLoading } = useCountServiceFund()

  const values = data ? Object.values(data) : []

  return <>{isLoading ? <Skeleton className="w-full h-[300px]" /> : <BigCard data={values}></BigCard>}</>
}
const ChartPokmas = () => {
  const { data: CommunityGroup, isLoading } = useCommunityGroupAssistance()

  const data = CommunityGroup ? CommunityGroup.map((val: any) => val.count) : []
  const label = CommunityGroup ? CommunityGroup.map((val: any) => val.applicationYear.toString()) : []
  const color = ['#F94144', '#F3722C', '#F9C74F', '#90BE6D', '#F8961E']
  const title = ['POKMAS', 'Perkembangan Data POKMAS']

  return (
    <>
      <LongCard props={title}>
        {isLoading ? (
          <Skeleton className="w-[300px] h-[300px] rounded-full" />
        ) : (
          <LongCard.Chart
            // data={[20, 10, 12, 13, 21]}
            data={data}
            label={label}
            backgroundColor={color}
          />
        )}
      </LongCard>
    </>
  )
}
const ChartKube = () => {
  const { data: BusinessGroup, isLoading } = useBusinessGroupAssistance()

  // if (isLoading) return <Loading />

  // return
  const data = BusinessGroup ? BusinessGroup.map((valdata: any) => valdata.count) : []
  const label = BusinessGroup ? BusinessGroup.map((val: any) => val.budgetYear) : []
  const color = ['#F94144', '#F3722C', '#F9C74F', '#90BE6D', '#F8961E']
  const title = ['KUBE', 'Perkembangan Data KUBE']
  return (
    <>
      <LongCard props={title}>
        {isLoading ? (
          <Skeleton className="w-[300px] h-[300px] rounded-full" />
        ) : (
          <LongCard.Chart
            // data={[20, 10, 12, 13, 21]}
            data={data}
            label={label}
            backgroundColor={color}
          />
        )}
      </LongCard>
    </>
  )
}
const ChartRi = () => {
  const { data: WorshipPlace, isLoading } = useDataWorshipPlace()

  // if (isLoading) return <Loading />

  // return
  const data = WorshipPlace ? WorshipPlace.map((valdata: any) => valdata.count) : []
  const type = WorshipPlace ? WorshipPlace.map((val: any) => val.type) : []
  // const color = ['#F94144', '#F3722C', '#F9C74F', '#90BE6D', '#F8961E']
  // const title = ['KUBE', 'Perkembangan Data KUBE']

  return (
    <>
      <LongCard props={['Rumah Ibadah', 'Persentasi Rumah Ibadah']}>
        {isLoading ? (
          <Skeleton className="w-[300px] h-[300px] rounded-full" />
        ) : (
          <LongCard.Chart
            // data={[20, 5, 13, 13, 22, 15, 12]}
            data={data}
            label={type}
            // label={['Mesjid', 'Gereja', 'Kuil Hindu', 'Gereja Khatolik', 'Kuil Budha', 'Musholla', 'Kuil Budha']}
            // isPercent={true}
            backgroundColor={['#F94144', '#F3722C', '#F9C74F', '#90BE6D', '#F8961E', '#2D9CDB', '#DD2153']}
          />
        )}
      </LongCard>
    </>
  )
}

export default SectionDayasos
