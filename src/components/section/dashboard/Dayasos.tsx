import { Loading } from '@/components'
import BasicCard from '@/components/ui/dashboard/BasicCard'
import BigCard from '@/components/ui/dashboard/BigCard'
import LongCard from '@/components/ui/dashboard/LongCard'
import TitleSign from '@/components/ui/dashboard/TitleSign'
import { useBusinessGroupAssistance, useCommunityGroupAssistance, useCountDataDayasos, useCountServiceFund } from '@/store/server'

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

  if (isLoading) return <Loading />

  const { veteran, serviceFund, worshipPlace, organizationGrantAssistance, jointBusinessGroupAssistance, communityGroupAssistance, fuelCashAssistance, nonCashFoodAssistance } = data

  return (
    <>
      <div className="grid grid-cols-4 gap-5 mt-5">
        <BasicCard props={['Total Jumlah Data Veteran', veteran, 'Jiwa']} />
        <BasicCard props={['Total DJPM Terdaftar', serviceFund, 'Data']} />
        <BasicCard props={['Total Rumah Ibadah ', worshipPlace, 'Data']} />
        <BasicCard props={['Total BHO Yang Terdaftar', organizationGrantAssistance, 'Organisasi/Lembaga']} />
      </div>
      <div className="grid grid-cols-4 gap-5 mt-5">
        <BasicCard props={['Total KUBE Terdaftar', jointBusinessGroupAssistance, 'Data']} />
        <BasicCard props={['Total POKMAS Terdaftar', communityGroupAssistance, 'Data']} />
        <BasicCard props={['Total BLTBBM ', fuelCashAssistance, 'Data']} />
        <BasicCard props={['Total BPNT', nonCashFoodAssistance, 'Organisasi/Lembaga']} />
      </div>
    </>
  )
}

const CardDjpm = () => {
  const { data, isLoading } = useCountServiceFund()

  if (isLoading) return <Loading />

  const values = Object.values(data)

  return (
    <>
      <BigCard data={values}></BigCard>
    </>

  )
}
const ChartPokmas = () => {
  const { data: CommunityGroup, isLoading } = useCommunityGroupAssistance()

  if (isLoading) return <Loading />

  // const data = CommunityGroup.map((val: any) => val.count)
  const label = CommunityGroup.map((val: any) => val.applicationYear.toString())
  // console.log(data)
  const color = ['#F94144', '#F3722C', '#F9C74F', '#90BE6D', '#F8961E']
  const title = ['POKMAS', 'Perkembangan Data POKMAS']

  return (
    <>
      <LongCard props={title}>
        <LongCard.Chart
          data={[20, 10, 12, 13, 21]}
          label={label}
          backgroundColor={color}
        />
      </LongCard>
    </>

  )
}
const ChartKube = () => {
  const { data: BusinessGroup, isLoading } = useBusinessGroupAssistance()

  if (isLoading) return <Loading />

  // return
  // const data = BusinessGroup.map((valdata: any) => valdata.count)
  const label = BusinessGroup.map((val: any) => val.budgetYear)
  // console.log(label)
  const color = ['#F94144', '#F3722C', '#F9C74F', '#90BE6D', '#F8961E']
  const title = ['KUBE', 'Perkembangan Data KUBE']

  return (
    <>
      <LongCard props={title}>
        <LongCard.Chart
          data={[20, 10, 12, 13, 21]}
          label={label}
          backgroundColor={color}
        />
      </LongCard>
    </>

  )
}
const ChartRi = () => {
  // const { data: WorshipPlace, isLoading } = useDataWorshipPlace()

  // if (isLoading) return <Loading />

  // return
  // const data = BusinessGroup.map((valdata: any) => valdata.count)
  // const label = BusinessGroup.map((val: any) => val.budgetYear)
  // console.log(WorshipPlace)
  // const color = ['#F94144', '#F3722C', '#F9C74F', '#90BE6D', '#F8961E']
  // const title = ['KUBE', 'Perkembangan Data KUBE']

  return (
    <>
      <LongCard props={['Rumah Ibadah', 'Persentasi Rumah Ibadah']}>
        <LongCard.Chart
          data={[20, 5, 13, 13, 22, 15, 12]}
          label={['Mesjid', 'Gereja', 'Kuil Hindu', 'Gereja Khatolik', 'Kuil Budha', 'Musholla', 'Kuil Budha']}
          isPercent={true}
          backgroundColor={['#F94144', '#F3722C', '#F9C74F', '#90BE6D', '#F8961E', '#2D9CDB', '#DD2153']}
        />
      </LongCard>
    </>

  )
}

export default SectionDayasos
