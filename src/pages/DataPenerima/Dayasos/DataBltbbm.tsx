import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useTitle from '@/hooks/useTitle'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from './../../../components/atoms/Pagination'
import * as React from 'react'
import { useGetFuelCashAssistance, useGetFuelCashAssistanceDetail } from '@/store/server'
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { Action, Loading, Modal } from '@/components'
interface FormValues {
  q: string
}
const DataBltbbm = () => {
  useTitle('Data Penerima / Dayasos / BLTBBM ')
  const [isShow, setIsShow] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')
  const createParams = useCreateParams()
  const { page, q } = useGetParams(['page', 'q'])
  const { data: fuelCashAssistance, isLoading: isLoadingFuelCashAssistance } = useGetFuelCashAssistanceDetail(selectedId)
  const forms = useForm<FormValues>({
    defaultValues: {
      q: ''
    }
  })
  const [isLoadingPage, setIsLoadingPage] = React.useState(false)
  const showDetail = (id: string) => {
    setSelectedId(id)
    setIsShow(true)
  }
  const {
    data: fuelCashAssistances,
    refetch,
    isFetching,
    isLoading
  } = useGetFuelCashAssistance({
    page: parseInt(page) ?? 1,
    q
  })
  useDisableBodyScroll(isFetching)

  const onSubmit = async (values: FormValues) => {
    if (values.q !== '') {
      createParams({
        key: 'q',
        value: values.q !== '' ? values.q : ''
      })
      createParams({ key: 'page', value: '' }) // Set page to empty string when searching
    } else {
      createParams({ key: 'q', value: '' }) // Set q to empty string if the search query is empty
    }
    await refetch()
  }

  React.useEffect(() => {
    if (isFetching) {
      setIsLoadingPage(true)
    } else {
      setIsLoadingPage(false)
    }
  }, [isLoadingPage, isFetching])

  if (isLoading && isLoadingFuelCashAssistance) {
    return <Loading />
  }

  return (
    <div>
      <Container>
        {isFetching && <Loading />}
        <h1 className="font-bold text-2xl ">Bantuan Langsung Tunai BBM (BLTBBM)</h1>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-x-10 gap-y-5 pt-10">
              <FormField
                name="q"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-[140px] h-[50px] ml-auto rounded-xl">
              <Button className="py-6">
                <HiMagnifyingGlass className="w-6 h-6 py" />
                <p className="font-bold text-sm text-white ml-3">Cari Data</p>
              </Button>
            </div>
          </form>
        </Form>
      <section className="border rounded-xl mt-5 overflow-hidden">
        <Table className="mt-5">
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-[#534D59] font-bold text-[15px]">No.</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">NIK</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]"> Jenis Keanggotaan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fuelCashAssistances?.data?.length !== 0 ? (
              fuelCashAssistances?.data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-left bg-[#F9FAFC]">
                    {(fuelCashAssistances.meta.currentPage - 1) * fuelCashAssistances.meta.perPage + index + 1}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.beneficiary.name}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.beneficiary.identityNumber}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.type}</TableCell>
                  <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                  <Action onDetail={() => showDetail(item.id)}/>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </section>
        {(fuelCashAssistances?.meta?.total as number) > 10 ? (
          <Pagination
            className="px-5 py-5 flex justify-end"
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={fuelCashAssistances?.meta.total as number}
            pageSize={30}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}
      </Container>
      <Modal isShow={isShow} className='md:max-w-4xl'>
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Detail Data DJPM</h3>
          <p className="text-sm text-[#A1A1A1]">View Data Detail Data DJPM</p>
        </Modal.Header>
        {isLoadingFuelCashAssistance && <Loading />}
        <div className='grid grid-cols-3 gap-y-5'>
          <div>
              <p className="text-sm font-bold">Nama</p>
              <p className="text-base capitalize">{fuelCashAssistance?.beneficiary.name}</p>
            </div>
            <div>
              <p className="text-sm font-bold">NIK</p>
              <p className="text-base capitalize">{fuelCashAssistance?.beneficiary.identityNumber}</p>
            </div>
            <div>
              <p className="text-sm font-bold">No. KK</p>
              <p className="text-base capitalize">{fuelCashAssistance?.beneficiary.familyCardNumber}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Kecamatan</p>
              <p className="text-base capitalize">{fuelCashAssistance?.beneficiary.address.areaLevel3?.name}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Kelurahan</p>
              <p className="text-base capitalize">{fuelCashAssistance?.beneficiary.address.areaLevel4?.name}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Alamat Lengkap</p>
              <p className="text-base capitalize">{fuelCashAssistance?.beneficiary.address.fullAddress}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Pekerjaan</p>
              <p className="text-base capitalize">{fuelCashAssistance?.beneficiary.occupation}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Tempat / Tanggal Lahir</p>
              <p className="text-base capitalize">{fuelCashAssistance?.beneficiary.birthPlace} / {fuelCashAssistance?.beneficiary.birthDate}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Status DTKS</p>
              <p className="text-base capitalize">{fuelCashAssistance?.beneficiary.isDtks ? 'DTKS' : 'Tidak DTKS'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Jenis Keanggotaan</p>
              <p className="text-base capitalize">{fuelCashAssistance?.type}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Usia</p>
              <p className="text-base capitalize">{fuelCashAssistance?.beneficiary.age}</p>
            </div>
          </div>
      </Modal>
    </div>
  )
}
export default DataBltbbm
