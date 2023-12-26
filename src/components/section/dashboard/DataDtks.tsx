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
  const { data, refetch, isLoading, isFetching } = useGetAdministrativeArea(order)

  // return
  const onChange = async (values: any) => {
    forms.setValue('filter', values)
    setorder(values)
    await refetch()
  }

  return (
    <>
      <LongCard props={['Prevalensi DTKS Perkecamatan', 'Prevalensi DTKS Perkecamatan']}>
        {isLoading ? (
          <div className="py-8">
            <div className="flex flex-col gap-3">
              <Skeleton className="w-[300px] h-[60px]" />
              <Skeleton className="w-[300px] h-[60px]" />
              <Skeleton className="w-[300px] h-[60px]" />
              <Skeleton className="w-[300px] h-[60px]" />
            </div>
          </div>
        ) : (
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
                        <Select defaultValue="Menurun" onValueChange={onChange} value={field.value}>
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
            {isFetching ? (
              <div className="py-8">
                <div className="flex flex-col gap-3">
                  <Skeleton className="w-full h-[50px]" />
                  <Skeleton className="w-full h-[50px]" />
                  <Skeleton className="w-full h-[50px]" />
                  <Skeleton className="w-full h-[50px]" />
                </div>
              </div>
            ) : (
              <LongCard.Tabel data={data.data} />
            )}
          </div>
        )}
      </LongCard>
    </>
  )
}
const ChartJenisKelamin = () => {
  const { data, isLoading } = useGetGenderDtks()

  return (
    <>
      <LongCard props={['Jenis Kelamin', 'Persentasi Data DTKS Berdasarkan Jenis Kelamin']}>
        {isLoading ? (
          <div className="py-8 ">
            <Skeleton className="w-[300px] h-[300px] rounded-full" />
          </div>
        ) : (
          <LongCard.Chart
            data={Object.values(data)}
            // isPercent={true}
            label={['Perempuan', 'Laki-laki']}
            backgroundColor={['#F94144', '#F3722C']}
          />
        )}
      </LongCard>
    </>
  )
}
const ChartDtks = () => {
  const { data, isLoading } = useGetDataDtks()

  return (
    <>
      <LongCard props={['Data DTKS', 'Persentasi Data DTKS']}>
        {isLoading ? (
          <div className="py-8 ">
            <Skeleton className="w-[300px] h-[300px] rounded-full" />
          </div>
        ) : (
          <LongCard.Chart
            data={Object.values(data)}
            // isPercent={true}
            label={['DTKS', 'Non DTKS']}
            backgroundColor={['#F94144', '#F3722C']}
          />
        )}
      </LongCard>
    </>
  )
}
const CardData = () => {
  const { data, isLoading } = useCountDataDtks()

  return (
    <>
      {isLoading ? (
        [...Array(3)].map((_, i) => (
          <div className="rounded-xl bg-white p-4" key={i}>
            <div className="flex flex-col gap-2">
              <Skeleton className="w-[120px] h-3 rounded-[14px]" />
              <Skeleton className="w-[80px] h-3 rounded-[14px]" />
              <Skeleton className="w-[80px] h-3 rounded-[14px]" />
            </div>
          </div>
        ))
      ) : (
        <>
          <BasicCard props={['Total Data DTKS', data?.beneficiaries, 'Jiwa']} />
          <BasicCard props={['Jumlah data Non DTKS', data?.nonBeneficiaries, 'Data']} />
          <BasicCard props={['Jumlah Keluarga Penerima', data?.familyBeneficiaries, 'Data']} />
        </>
      )}
    </>
  )
}

export default SectionDataDtks
