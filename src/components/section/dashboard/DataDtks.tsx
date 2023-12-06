import { Loading } from '@/components'
import BasicCard from '@/components/ui/dashboard/BasicCard'
import LongCard from '@/components/ui/dashboard/LongCard'
import TitleSign from '@/components/ui/dashboard/TitleSign'
import { Skeleton } from '@/components/ui/skeleton'
import { useCountDataDtks, useGetAdministrativeArea, useGetDataDtks, useGetGenderDtks } from '@/store/server'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
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
  const forms = useForm<any>({
    mode: 'onTouched',
    defaultValues: {
      filter: ''
    }
  })

  const [order, setorder] = useState('Menurun')
  const { data, refetch, isLoading } = useGetAdministrativeArea(order)

  if (isLoading) return <Loading />

  const onChange = async (values: any) => {
    forms.setValue('filter', values)
    setorder(values)
    await refetch()
  }

  return (
    <>
      <LongCard props={['Prevalensi DTKS Perkecamatan', 'Prevalensi DTKS Perkecamatan']}>
        <div className=" w-[340px] my-5">
          <div className="my-2">
            <Form {...forms}>
              <form className="flex flex-col">
                <FormField
                  name="filter"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Cari Berdasarkan</FormLabel>
                      <Select defaultValue='Menurun' onValueChange={onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Menurun" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Menurun">Menurun</SelectItem>
                          <SelectItem value="Menaik">Menaik</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <LongCard.Tabel data={data} />
        </div>
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

  // console.log({ beneficiaries, nonbeneficiaries, familybeneficiaries })
  const { beneficiaries, nonBeneficiaries, familyBeneficiaries } = data
  // console.log({ beneficiaries, nonBeneficiaries, familyBeneficiaries })

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton className="w-12 h-12 rounded-[14px]" />
          <div className="flex flex-col gap-3">
            <Skeleton className="w-[120px] h-3 rounded-[14px]" />
            <Skeleton className="w-[80px] h-3 rounded-[14px]" />
          </div>
        </>
      ) : <>
        <BasicCard props={['Total Data DTKS', beneficiaries, 'Jiwa']} />
        <BasicCard props={['Jumlah data Non DTKS', nonBeneficiaries, 'Data']} />
        <BasicCard props={['Jumlah Keluarga Penerima', familyBeneficiaries, 'Data']} />
      </>
      }
    </>
  )
}

export default SectionDataDtks
