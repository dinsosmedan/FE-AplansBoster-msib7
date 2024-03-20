import { Container, ExportButton, CreateDataMaster, Loading, Pagination, SearchSelect } from '@/components'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCreateParams, useDisableBodyScroll, useGetParams, useTitle } from '@/hooks'
import { formatToView } from '@/lib/services/formatDate'
import { useGetBeneficiary, useGetKecamatan, useGetKelurahan } from '@/store/server'
import * as React from 'react'
import { exportElderlyCashSocialAssistanceFn, getElderlyCashSocialAssistanceFn } from '@/api/rehabsos.api'
import { useForm } from 'react-hook-form'
import { HiArrowPath, HiMagnifyingGlass, HiOutlineExclamationCircle, HiPlus } from 'react-icons/hi2'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

interface FormValuesSearch {
  q: string
  kelurahan: string
  kecamatan: string
  isDtks: string
}

export default function DataMaster() {
  useTitle('Data Master')
  const navigate = useNavigate()
  const createParams = useCreateParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const { q, kecamatan, kelurahan, page, isDtks } = useGetParams(['q', 'kecamatan', 'kelurahan', 'page', 'isDtks'])

  const [isShow, setIsShow] = React.useState(false)
  const forms = useForm<FormValuesSearch>({
    defaultValues: {
      q: '',
      kecamatan: '',
      kelurahan: '',
      isDtks: ''
    }
  })

  const areaLevel3 = forms.watch('kecamatan')
  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3 ?? kecamatan)
  const {
    data: beneficiary,
    refetch,
    isFetching,
    isLoading
  } = useGetBeneficiary({
    page: parseInt(page) ?? 1,
    idKecamatan: kecamatan,
    idKelurahan: kelurahan,
    q,
    isDtks
  })

  useDisableBodyScroll(isFetching || isShow)

  const shouldDisplayResetButton = (variant: 'with-page' | 'without-page' = 'without-page') => {
    if (variant === 'with-page') return q || kecamatan || kelurahan || page || isDtks
    return q || kecamatan || kelurahan || isDtks
  }

  React.useEffect(() => {
    if (shouldDisplayResetButton()) {
      forms.reset({ q, kecamatan, kelurahan, isDtks })
    }
  }, [q, kecamatan, kelurahan, page, isDtks])

  if (isLoading) return <Loading />

  const onSubmitSearch = async (values: FormValuesSearch) => {
    Object.keys(values).forEach((key) => {
      if (values[key as keyof FormValuesSearch] !== '' && values[key as keyof FormValuesSearch] !== undefined) {
        createParams({ key, value: values[key as keyof FormValuesSearch] })
      } else {
        searchParams.delete(key)
        setSearchParams(searchParams.toString(), { replace: true })
      }
    })
    searchParams.delete('page')
    setSearchParams(searchParams.toString(), { replace: true })
    await refetch()
  }
  const exportAsCsv = async () => {
    setIsShow(true)
    const response = await exportElderlyCashSocialAssistanceFn('csv', {
      idKecamatan: kecamatan,
      idKelurahan: kelurahan,

      q
    })
    if (response.success) {
      void alert({
        title: 'Berhasil Export',
        description: 'Hasil Export akan dikirim ke Email anda. Silahkan cek email anda secara berkala.',
        submitText: 'Oke',
        variant: 'success'
      })
    }
    setIsShow(false)
  }

  const exportAsXlsx = async () => {
    setIsShow(true)
    const response = await exportElderlyCashSocialAssistanceFn('xlsx', {
      idKecamatan: kecamatan,
      idKelurahan: kelurahan,

      q
    })
    if (response.success) {
      void alert({
        title: 'Berhasil Export',
        description: 'Hasil Export akan dikirim ke Email anda. Silahkan cek email anda secara berkala.',
        submitText: 'Oke',
        variant: 'success'
      })
    }
    setIsShow(false)
  }

  const handleReset = () => {
    forms.reset({ q: '', kecamatan: '', kelurahan: '', isDtks: '' })
    navigate('/data-master')
  }

  return (
    <Container>
      {isFetching && <Loading />}
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmitSearch)} className="flex flex-col gap-[18px]">
          <div className="w-full flex flex-row justify-between">
            <FormField
              name="q"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="w-[90%]">
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="Cari berdasarkan NIK atau Nama" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex flex-row gap-5 my-5">
            <div className="w-[40%]">
              <FormField
                name="kecamatan"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SearchSelect
                        selected={field.value}
                        onChange={field.onChange}
                        width="w-[220px]"
                        placeholder="Pilih Kecamatan"
                        options={
                          listKecamatan?.map((kecamatan) => ({ label: kecamatan.name, value: kecamatan.id })) ?? []
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-[40%]">
              <FormField
                name="kelurahan"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SearchSelect
                        selected={field.value}
                        onChange={field.onChange}
                        disabled={!areaLevel3 && !kecamatan}
                        width="w-[220px]"
                        placeholder="Pilih Kelurahan"
                        options={
                          listKelurahan?.map((kelurahan) => ({ label: kelurahan.name, value: kelurahan.id })) ?? []
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-3 w-[40%] justify-start">
              <Button type="button" variant="outline" className="gap-3 text-primary rounded-lg" onClick={handleReset}>
                <HiArrowPath className="text-lg" />
                <span>Reset</span>
              </Button>
              <Button type="submit" className="gap-2 border-none rounded-lg">
                <HiMagnifyingGlass className="text-lg" />
                <span>Cari Data</span>
              </Button>
            </div>
          </div>
        </form>
        <div className="flex items-left gap-3 w-[40%] justify-start">
          <Button type="button" className="bg-primary w-[140px] flex rounded-xl py-4" onClick={() => setIsShow(true)}>
            <HiPlus className="w-6 h-6 text-white" />
            <p className="font-bold text-sm text-white">Tambah Data</p>
          </Button>
          {beneficiary?.data?.length !== 0 ? (
            <ExportButton onExportFirst={exportAsXlsx} onExportSecond={exportAsCsv} />
          ) : null}
        </div>
      </Form>
      <Table className="mt-5">
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white font-bold text-[15px]">No.</TableHead>
            <TableHead className="text-white font-bold text-[15px]">NIK</TableHead>
            <TableHead className="text-white font-bold text-[15px]">No.KK</TableHead>
            <TableHead className="text-white font-bold text-[15px]">Nama</TableHead>
            <TableHead className="text-white font-bold text-[15px]">Kecamatan</TableHead>
            <TableHead className="text-white font-bold text-[15px]">Kelurahan</TableHead>
            <TableHead className="text-white font-bold text-[15px]">Tanggal Update</TableHead>
            <TableHead className="text-white font-bold text-[15px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {beneficiary?.data?.length !== 0 ? (
            beneficiary?.data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="text-center bg-[#F9FAFC]" position="center">
                  {(beneficiary.meta.currentPage - 1) * beneficiary.meta.perPage + index + 1}
                </TableCell>
                <TableCell className="text-center bg-[#F9FAFC]" position="center">
                  {item.identityNumber}
                </TableCell>
                <TableCell className="text-center bg-[#F9FAFC]" position="center">
                  {item.familyCardNumber ?? '-'}
                </TableCell>
                <TableCell className="text-center bg-[#F9FAFC]">{item.name ?? '-'}</TableCell>
                <TableCell className="text-center bg-[#F9FAFC]" position="center">
                  {item.address.areaLevel3?.name ?? '-'}
                </TableCell>
                <TableCell className="text-center bg-[#F9FAFC]" position="center">
                  {item.address.areaLevel4?.name ?? '-'}
                </TableCell>
                <TableCell className="text-center bg-[#F9FAFC]" position="center">
                  {formatToView(item.createdAt) ?? '-'}
                </TableCell>
                <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                  <Link to={`/data-master/info-data-master/${item.id}`}>
                    <Button variant="base" size="icon">
                      <HiOutlineExclamationCircle className="h-7 w-7" />
                    </Button>
                  </Link>
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
      {(beneficiary?.meta?.total as number) > 30 ? (
        <Pagination
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={beneficiary?.meta.total as number}
          pageSize={30}
          onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
        />
      ) : null}
      <CreateDataMaster isShow={isShow} setIsShow={setIsShow} />
    </Container>
  )
}
