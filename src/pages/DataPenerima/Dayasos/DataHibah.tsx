import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useTitle from '@/hooks/useTitle'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from './../../../components/atoms/Pagination'
import * as React from 'react'
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { useDeleteOrganizationGrantAssistance, useGetOrganizationGrantAssistance, useGetOrganizationGrantAssistanceById } from './../../../store/server/useDayasos'
import { Action, Loading, Modal, Search } from '@/components'
import { useAlert } from '@/store/client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const DataHibah = () => {
  useTitle('Data Penerima / Dayasos / Bansos Hibah Organisasi/Lembaga (BHO) ')
  const { alert } = useAlert()
  const [isShow, setIsShow] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')
  const createParams = useCreateParams()
  const { q, budgetYear, page } = useGetParams(['q', 'budgetYear', 'page'])

  interface FormValues {
    q: string
    budgetYear: string
  }

  const [isLoadingPage, setIsLoadingPage] = React.useState(false)
  const showDetail = (id: string) => {
    setSelectedId(id)
    setIsShow(true)
  }
  const forms = useForm<FormValues>({
    defaultValues: {
      q: '',
      budgetYear: ''
      // batch: ''
    }
  })
  const { data: organizationGrantAssistance, isLoading: isLoadingOrganization } = useGetOrganizationGrantAssistanceById(selectedId)

  const {
    data: organizationGrantAssistances,
    refetch,
    isFetching,
    isLoading
  } = useGetOrganizationGrantAssistance({
    page: parseInt(page) ?? 1,
    name: q,
    budgetYear
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

    if (values.budgetYear !== '') {
      createParams({
        key: 'budgetYear',
        value: values.budgetYear !== '' ? values.budgetYear : ''
      })
    } else {
      createParams({ key: 'budgetYear', value: '' }) // Set budgetYear to empty string if it's empty
    }

    await refetch()
  }
  const { mutateAsync: deleteOrganizationGrantAssistance } = useDeleteOrganizationGrantAssistance()
  const handleDelete = (id: string) => {
    void alert({
      title: 'Hapus Data DJPM',
      description: 'Apakah kamu yakin ingin menghapus data ini?',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async() => {
      await deleteOrganizationGrantAssistance(id)
    })
  }
  React.useEffect(() => {
    if (isFetching) {
      setIsLoadingPage(true)
    } else {
      setIsLoadingPage(false)
    }
  }, [isLoadingPage, isFetching])

  if (isLoading && isLoadingOrganization) {
    return <Loading />
  }
  return (
    <Container>
      {isFetching && <Loading />}
      <h1 className="font-bold text-2xl ">Bansos Hibah Organisasi/Lembaga (BHO)</h1>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-x-10 gap-y-5 pt-10">
            <FormField
              name="q"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Search {...field} placeholder="Masukkan Nama Lembaga/ NIK Ketua" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="budgetYear"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Search {...field} placeholder="Masukkan Tahun" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <section className="flex items-center justify-between">
            <Select>
              <SelectTrigger className="border-primary flex gap-5 rounded-lg font-bold w-fit bg-white text-primary focus:ring-0">
                <SelectValue placeholder="Export" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=".clsx">.clsx</SelectItem>
                <SelectItem value=".csv">.csv</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-3">
              <Button className="gap-2 border-none rounded-lg" type="submit">
                <HiMagnifyingGlass className="text-lg" />
                <span>Cari Data</span>
              </Button>
            </div>
          </section>
        </form>
      </Form>
      <section className="border rounded-xl mt-5 overflow-hidden">
        <Table className="mt-5">
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-[#534D59] font-bold text-[15px]">No.</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama Lembaga</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama Ketua</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">NIK</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Alamat</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nomor Handphone</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Jumlah Bantuan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Tahun</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizationGrantAssistances?.data?.length !== 0 ? (
              organizationGrantAssistances?.data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center bg-[#F9FAFC]">
                    {(organizationGrantAssistances.meta.currentPage - 1) * organizationGrantAssistances.meta.perPage +
                      index +
                      1}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.name}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.chairmanName}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.chairmanIdentityNumber}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.address.fullAddress}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.contactNumber}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.aprrovedAmount}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.budgetYear}</TableCell>
                  <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                    <Action onDelete={() => handleDelete(item.id)} onDetail={() => showDetail(item.id)} />
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
      {(organizationGrantAssistances?.meta?.total as number) > 30 ? (
        <Pagination
          className="px-5 py-5 flex justify-end"
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={organizationGrantAssistances?.meta.total as number}
          pageSize={30}
          onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
        />
      ) : null}
      <Modal isShow={isShow} className="md:max-w-4xl">
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Detail Data DJPM</h3>
          <p className="text-sm text-[#A1A1A1]">View Data Detail Data DJPM</p>
        </Modal.Header>
        {isLoadingOrganization && <Loading />}
        <div className="grid grid-cols-3 gap-y-5">
          <div>
            <p className="text-sm font-bold">Nama Lembaga</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.name}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nama Ketua</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.chairmanName}</p>
          </div>
          <div>
            <p className="text-sm font-bold">NIK Ketua</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.chairmanIdentityNumber}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nama Sekretaris</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.secretaryName}</p>
          </div>
          <div>
            <p className="text-sm font-bold">NIK Sekretaris</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.secretaryIdentityNumber}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nama Bendahara</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.treasurerName}</p>
          </div>
          <div>
            <p className="text-sm font-bold">NIK Bendahara</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.treasurerIdentityNumber}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nomor Kontak</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.contactNumber}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kecamatan</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.address.areaLevel3?.name}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kelurahan</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.address.areaLevel4?.name}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Alamat Lengkap</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.address.fullAddress}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nama Rekening</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.bankAccountName}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nomor Rekening</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.bankAccountNumber}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nama Bank</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.bankName}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Anggaran Yang Diminta</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.requestedAmount}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Anggaran Yang disetujui</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.aprrovedAmount}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Pembayaran Pertama</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.firstDisbursementAmount}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Pembayaran Kedua</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.secondDisbursementAmount}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tahun Anggaran</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.budgetYear}</p>
          </div>
        </div>
      </Modal>
    </Container>
  )
}
export default DataHibah
