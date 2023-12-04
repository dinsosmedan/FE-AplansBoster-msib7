import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useTitle from '@/hooks/useTitle'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { HiArrowPath, HiMagnifyingGlass, HiMiniTrash } from 'react-icons/hi2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from './../../../components/atoms/Pagination'
import * as React from 'react'
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { useDeleteBusinessGroup, useGetBusinessGroup, useGetKecamatan, useGetKelurahan } from '@/store/server'
import { Action, Loading } from '@/components'
import { useAlert } from '@/store/client'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
interface FormValues {
  q: string
  kelurahan: string
  kecamatan: string
  year: string
}
const DataKube = () => {
  useTitle('Data Penerima / Dayasos / Kube ')
  const { alert } = useAlert()
  const navigate = useNavigate()
  const createParams = useCreateParams()

  const { page, q, kecamatan, kelurahan, year } = useGetParams(['page', 'q', 'kecamatan', 'kelurahan', 'year'])

  const forms = useForm<FormValues>({
    defaultValues: {
      q: '',
      kecamatan: '',
      kelurahan: '',
      year: ''
    }
  })
  const [isLoadingPage, setIsLoadingPage] = React.useState(false)
  const areaLevel3 = forms.watch('kecamatan')
  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3 ?? kecamatan)

  const {
    data: businessGroup,
    refetch,
    isFetching,
    isLoading
  } = useGetBusinessGroup({
    page: parseInt(page) ?? 1,
    idKecamatan: kecamatan,
    idKelurahan: kelurahan,
    q,
    year
  })

  useDisableBodyScroll(isFetching)
  const handleReset = () => {
    navigate('/data-penerima/dayasos/data-kube')
    forms.reset()
  }
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

    if (values.year !== '') {
      createParams({
        key: 'year',
        value: values.year !== '' ? values.year : ''
      })
      createParams({ key: 'page', value: '' }) // Set page to empty string when searching
    } else {
      createParams({ key: 'year', value: '' }) // Set budgetYear to empty string if it's empty
    }
    if (values.kecamatan !== '') {
      createParams({
        key: 'kecamatan',
        value: values.kecamatan !== '' ? values.kecamatan : ''
      })
      createParams({ key: 'page', value: '' }) // Set page to empty string when searching
    } else {
      createParams({ key: 'kecamatan', value: '' }) // Set budgetYear to empty string if it's empty
    }
    if (values.kelurahan !== '') {
      createParams({
        key: 'kelurahan',
        value: values.kelurahan !== '' ? values.kelurahan : ''
      })
      createParams({ key: 'page', value: '' }) // Set page to empty string when searching
    } else {
      createParams({ key: 'kelurahan', value: '' }) // Set budgetYear to empty string if it's empty
    }

    await refetch()
  }
  const { mutateAsync: deleteBusinessGroup } = useDeleteBusinessGroup()
  const handleDelete = (id: string) => {
    void alert({
      title: 'Hapus Data DJPM',
      description: 'Apakah kamu yakin ingin menghapus data ini?',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteBusinessGroup(id)
    })
  }
  React.useEffect(() => {
    if (isFetching) {
      setIsLoadingPage(true)
    } else {
      setIsLoadingPage(false)
    }
  }, [isLoadingPage, isFetching])

  if (isLoading) {
    return <Loading />
  }
  return (
    <div>
      <Container>
        {isFetching && <Loading />}
        <h1 className="font-bold ext-2xl ">Kelompok Usaha Bersama (Kube)</h1>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-x-10 gap-y-5 pt-10">
              <FormField
                name="q"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Nama Kelompok Usaha Bersama" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="kecamatan"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value || ''}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kecamatan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {listKecamatan?.map((item, index) => (
                            <SelectItem key={index} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="kelurahan"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={areaLevel3 === '' && kecamatan === ''}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kelurahan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {listKelurahan?.map((item, index) => (
                            <SelectItem key={index} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="year"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Tahun Anggaran" />
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
                <Button type="button" variant="outline" className="gap-3 text-primary rounded-lg" onClick={handleReset}>
                  <HiArrowPath className="text-lg" />
                  <span>Reset</span>
                </Button>
                <Button className="gap-2 border-none rounded-lg" type="submit">
                  <HiMagnifyingGlass className="text-lg" />
                  <span>Cari Data</span>
                </Button>
              </div>
            </section>
          </form>
        </Form>
        <section className="border rounded-xl mt-5 overflow-hidden">
          <Table>
            <TableHeader className="bg-[#FFFFFF]">
              <TableRow>
                <TableHead className="text-[#534D59] font-bold text-[15px]">No.</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Nama Kelompok Usaha Bersama</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Alamat</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Kecamatan</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Kelurahan</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Jenis</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Tahun Anggaran</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Ubah Data</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Hapus Data</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {businessGroup?.data?.length !== 0 ? (
                businessGroup?.data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center bg-[#F9FAFC]">{index + 1}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item.businessName}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item.businessAddress?.fullAddress}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item.businessAddress?.areaLevel3?.name}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item.businessAddress?.areaLevel4?.name}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item.businessType}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item.budgetYear}</TableCell>
                    <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                      <Button
                        size="icon"
                        variant="base"
                        className="bg-[#959595] text-white hover:bg-[#828282] hover:text-white"
                        onClick={() => navigate(`/layanan/dayasos/kube/${item.id}`)}
                      >
                        <HiOutlinePencilAlt className="text-lg" />
                      </Button>
                    </TableCell>
                    <TableCell className="bg-[#F9FAFC]">
                      <Button
                        size="icon"
                        variant="default"
                        className=" text-white hover:text-white"
                        onClick={() => handleDelete(item.id)}
                      >
                        <HiMiniTrash className="text-lg" />
                      </Button>
                      <Action
                        onDelete={() => handleDelete(item.id)}
                        onDetail={() => console.log('detail')}
                        onEdit={() => console.log('detail')}
                      />
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
        {(businessGroup?.meta?.total as number) > 10 ? (
          <Pagination
            className="px-5 py-5 flex justify-end"
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={businessGroup?.meta.total as number}
            pageSize={10}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}
      </Container>
    </div>
  )
}
export default DataKube
