/* eslint-disable multiline-ternary */
import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useTitle from '@/hooks/useTitle'
import { useForm } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { HiArrowPath, HiMagnifyingGlass, HiMiniTrash } from 'react-icons/hi2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from './../../../components/atoms/Pagination'
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { useDeleteServiceFund, useGetKecamatan, useGetKelurahan, useGetServiceFunds } from '@/store/server'
import { Loading, Title } from '@/components'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useAlert } from '@/store/client'
import { Input } from '@/components/ui/input'

interface FormValues {
  q: string
  kelurahan: string
  kecamatan: string
}

const DataDjp = () => {
  useTitle('Data Penerima / Dayasos / DJPM ')
  const { alert } = useAlert()

  const navigate = useNavigate()
  const createParams = useCreateParams()
  const { q, kecamatan, kelurahan, page } = useGetParams(['q', 'kecamatan', 'kelurahan', 'page'])

  const forms = useForm<FormValues>({
    defaultValues: {
      q: '',
      kelurahan: '',
      kecamatan: ''
    }
  })

  const areaLevel3 = forms.watch('kecamatan')
  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3 ?? kecamatan)
  const {
    data: serviceFunds,
    refetch,
    isFetching,
    isLoading
  } = useGetServiceFunds({
    page: parseInt(page) ?? 1,
    idKecamatan: kecamatan,
    idKelurahan: kelurahan,
    name: q
  })

  useDisableBodyScroll(isFetching)
  const handleReset = () => {
    navigate('/data-penerima/dayasos/data-djp')
    forms.reset()
  }
  const onSubmit = async (values: FormValues) => {
    // Dapatkan nilai-nilai yang diisi dari form
    const { q, kecamatan, kelurahan } = values

    // Pastikan setiap parameter terisi sebelum pengiriman permintaan data
    if (q || kecamatan || kelurahan) {
      createParams({ key: 'q', value: q })
      createParams({ key: 'kecamatan', value: kecamatan })
      createParams({ key: 'kelurahan', value: kelurahan })
      await refetch()
    }
  }
  const { mutateAsync: deleteServiceFund } = useDeleteServiceFund()
  const handleDelete = (id: string) => {
    void alert({
      title: 'Hapus Data DJPM',
      description: 'Apakah kamu yakin ingin menghapus data ini?',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteServiceFund(id)
    })
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Container>
      {isFetching && <Loading />}
      <Title>Dana Jasa Pelayanan Masyarakat (DJPM)</Title>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-[18px]">
          <section className="grid grid-cols-3 gap-8 pt-[70px]">
            <FormField
              name="q"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Cari berdasarkan NIK atau Nama" />
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
                      disabled={areaLevel3 === '' && kecamatan === ''}
                      onValueChange={field.onChange}
                      value={field.value}
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
          </section>

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
          <TableHeader className="bg-white">
            <TableRow>
              <TableHead className="text-[#534D59] font-bold text-[15px]">No.</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">NIK</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Jenis Kelamin</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Tempat/ Tanggal Lahir</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kelurahan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kecamatan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Jenis Bantuan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Jumlah Bantuan Disetujui</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Ubah Data</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Hapus Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {serviceFunds?.data?.length !== 0 ? (
              serviceFunds?.data.map((serviceFund, index) => (
                <TableRow key={serviceFund.id}>
                  <TableCell className="text-center bg-[#F9FAFC]">
                    {(serviceFunds.meta.currentPage - 1) * serviceFunds.meta.perPage + index + 1}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{serviceFund.beneficiary.identityNumber}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{serviceFund.beneficiary.name}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{serviceFund.beneficiary.gender}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">
                    {serviceFund.beneficiary.birthPlace} / {serviceFund.beneficiary.birthDate}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">
                    {serviceFund.beneficiary.address.areaLevel4?.name}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">
                    {serviceFund.beneficiary.address.areaLevel3?.name}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{serviceFund.serviceType.name}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{serviceFund?.assistanceAmount ?? '-'}</TableCell>
                  <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                    <Button
                      size="icon"
                      variant="base"
                      className="bg-[#959595] text-white hover:bg-[#828282] hover:text-white"
                      onClick={() => navigate(`/layanan/dayasos/Djp/${serviceFund.id}`)}
                    >
                      <HiOutlinePencilAlt className="text-lg" />
                    </Button>
                  </TableCell>
                  <TableCell className="bg-[#F9FAFC]">
                    <Button
                      size="icon"
                      variant="default"
                      className=" text-white hover:text-white"
                      onClick={() => handleDelete(serviceFund.id)}
                    >
                      <HiMiniTrash className="text-lg" />
                    </Button>
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
      {(serviceFunds?.meta?.total as number) > 30 ? (
        <Pagination
          className="pt-5 flex justify-end"
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={serviceFunds?.meta.total as number}
          pageSize={10}
          onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
        />
      ) : null}
    </Container>
  )
}
export default DataDjp
