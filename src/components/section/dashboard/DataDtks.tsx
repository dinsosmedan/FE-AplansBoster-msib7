import { Loading } from '@/components'
import BasicCard from '@/components/ui/dashboard/BasicCard'
import LongCard from '@/components/ui/dashboard/LongCard'
import TitleSign from '@/components/ui/dashboard/TitleSign'
import { useCountDataDtks, useGetAdministrativeArea, useGetDataDtks, useGetGenderDtks } from '@/store/server'

const SectionDataDtks = () => {
  return (
    <>
      <div className=" ">
        <TitleSign text={'Data DTKS '} />
        <div className="grid grid-cols-3 gap-5 mt-5">
          <CardData />
        </div>
        <div className="grid grid-cols-3 gap-5 mt-5">
          <ChartDtks />
          <ChartJenisKelamin />
          <TabelDtks />
        </div>
      </div>
    </>
  )
}

const TabelDtks = () => {
  const { data, isLoading } = useGetAdministrativeArea()

  if (isLoading) return <Loading />

  return (
    <>
      <LongCard props={['Prevalensi DTKS Perkecamatan', 'Prevalensi DTKS Perkecamatan']}>
        <LongCard.Tabel data={data} />
      </LongCard>
    </>
  )
}
const ChartJenisKelamin = () => {
  const { data, isLoading } = useGetGenderDtks()

  if (isLoading) return <Loading />

  const values = Object.values(data)

  return (
    <>
      <LongCard props={['Jenis Kelamin', 'Persentasi Data DTKS Berdasarkan Jenis Kelamin']}>
        <LongCard.Chart
          data={values}
          isPercent={true}
          label={['Perempuan', 'Laki-laki']}
          backgroundColor={['#F94144', '#F3722C']}
        />
      </LongCard>
    </>
  )
}
const ChartDtks = () => {
  const { data, isLoading } = useGetDataDtks()

  if (isLoading) return <Loading />

  const values = Object.values(data)

  return (
    <>
      <LongCard props={['Data DTKS', 'Persentasi Data DTKS']}>
        <LongCard.Chart
          data={values}
          isPercent={true}
          label={['DTKS', 'Non DTKS']}
          backgroundColor={['#F94144', '#F3722C']}
        />
      </LongCard>
    </>
  )
}
const CardData = () => {
  const { data, isLoading } = useCountDataDtks()

  if (isLoading) return <Loading />

  const { beneficiaries, nonbeneficiaries, familybeneficiaries } = data

  return (
    <>
      <BasicCard props={['Total Data DTKS', beneficiaries, 'Jiwa']} />
      <BasicCard props={['Jumlah data Non DTKS', nonbeneficiaries, 'Data']} />
      <BasicCard props={['Jumlah Keluarga Penerima', familybeneficiaries, 'Data']} />
    </>
  )
}

export default SectionDataDtks
