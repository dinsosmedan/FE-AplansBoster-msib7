import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useTitle from '@/hooks/useTitle'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { HiArrowPath, HiMagnifyingGlass } from 'react-icons/hi2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from './../../../components/atoms/Pagination'
import { useNavigate } from 'react-router-dom'
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { useGetFamilyHopeByID, useGetFamilyHopeFn, useGetKecamatan, useGetKelurahan } from '@/store/server'
import { Action, Loading, Modal } from '@/components'
import React from 'react'
interface FormValues {
  q: string
  kelurahan: string
  kecamatan: string
  type: string
}
const DataPkh = () => {
  useTitle('Data Penerima / Linjamsos / PKH ')
  const navigate = useNavigate()
  const [isShow, setIsShow] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')
  const createParams = useCreateParams()
  const { q, kecamatan, kelurahan, page, type } = useGetParams(['q', 'kecamatan', 'kelurahan', 'page', 'type'])
  const forms = useForm<FormValues>({
    defaultValues: {
      q: '',
      kecamatan: '',
      kelurahan: '',
      type: ''
    }
  })
  const areaLevel3 = forms.watch('kecamatan')
  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3 ?? kecamatan)
  const { data: family, isLoading: isLoadingFamilyHope } = useGetFamilyHopeByID(selectedId)
  const {
    data: familys,
    refetch,
    isFetching,
    isLoading
  } = useGetFamilyHopeFn({
    page: parseInt(page) ?? 1,
    idKecamatan: kecamatan,
    idKelurahan: kelurahan,
    type,
    q
  })
  useDisableBodyScroll(isFetching)
  const updateParam = (key: any, value: any) => {
    if (value !== '') {
      createParams({ key, value })
      createParams({ key: 'page', value: '' })
    } else {
      createParams({ key, value: '' })
    }
  }

  const onSubmit = async (values: FormValues) => {
    updateParam('q', values.q)
    updateParam('kecamatan', values.kecamatan)
    updateParam('kelurahan', values.kelurahan)
    updateParam('type', values.type)

    await refetch()
  }
  const showDetail = (id: string) => {
    setSelectedId(id)
    setIsShow(true)
  }
  const handleReset = () => {
    navigate('/data-penerima/linjamsos/data-pkh')
    forms.reset()
  }
  if (isLoading && isLoadingFamilyHope) {
    return <Loading />
  }
  // const handleReset = () => {
  //   navigate('/data-penerima/dayasos/data-djp')
  //   forms.reset()
  // }

  return (
    <Container>
      <h1 className="font-bold text-2xl ">Program Keluarga Harapan (PKH)</h1>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid gap-x-5 gap-y-5 mt-6 ">
            <FormField
              name="q"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Nama / NIK" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
            <div className="grid grid-cols-3 gap-x-5 gap-y-5 ">
            <FormField
              name="type"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jenis Anggota" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="anggota">Anggota</SelectItem>
                        <SelectItem value="pengurus">Pengurus</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={areaLevel3 === '' && kecamatan === ''}>
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
            <div className='flex gap-3'>
              <Button type="button" variant="outline" className="gap-3 text-primary rounded-lg" onClick={handleReset}>
                <HiArrowPath className="text-lg" />
                <span>Reset</span>
              </Button>
              <Button>
                <HiMagnifyingGlass className="w-4 h-4 py" />
                <p className="font-bold text-sm text-white ml-3 w-max">Cari Data</p>
              </Button>
              </div>
          </section>
        </form>
      </Form>
      <section className="border rounded-xl mt-5 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-[#534D59] font-bold text-[15px]">No .</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama Pemohon</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">NIK</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Alamat Lengkap</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kecamatan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kelurahan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Jenis Keanggotaan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {familys?.data?.length !== 0 ? (
              familys?.data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-left bg-[#F9FAFC]">
                    {(familys.meta.currentPage - 1) * familys.meta.perPage + index + 1}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.beneficiary?.name ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.beneficiary?.identityNumber ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.beneficiary?.address.fullAddress ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.beneficiary?.address.areaLevel3?.name ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.beneficiary?.address.areaLevel4?.name ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.type ?? '-'}</TableCell>
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
      {(familys?.meta?.total as number) > 10 ? (
          <Pagination
            className="px-5 py-5 flex justify-end"
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={familys?.meta.total as number}
            pageSize={30}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}
        <Modal isShow={isShow} className="md:max-w-4xl">
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Detail Data PKH</h3>
          <p className="text-sm text-[#A1A1A1]">View Data Detail Data PKH</p>
        </Modal.Header>
        {isLoadingFamilyHope && <Loading />}
        <div className="grid grid-cols-3 gap-y-5">
          <div>
              <p className="text-sm font-bold">Nama</p>
              <p className="text-base capitalize">{family?.beneficiary.name ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">NIK</p>
              <p className="text-base capitalize">{family?.beneficiary.identityNumber ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">No. KK</p>
              <p className="text-base capitalize">{family?.beneficiary.familyCardNumber ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Kecamatan</p>
              <p className="text-base capitalize">{family?.beneficiary.address.areaLevel3?.name ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Kelurahan</p>
              <p className="text-base capitalize">{family?.beneficiary.address.areaLevel4?.name ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Alamat Lengkap</p>
              <p className="text-base capitalize">{family?.beneficiary.address.fullAddress ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Pekerjaan</p>
              <p className="text-base capitalize">{family?.beneficiary.occupation ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Tempat / Tanggal Lahir</p>
              <p className="text-base capitalize">{family?.beneficiary.birthPlace ?? '-'} / {family?.beneficiary.birthDate ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Status DTKS</p>
              <p className="text-base capitalize">{family?.beneficiary.isDtks ? 'DTKS' : 'Tidak DTKS'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Jenis Keanggotaan</p>
              <p className="text-base capitalize">{family?.type ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Usia</p>
              <p className="text-base capitalize">{family?.beneficiary.age ?? '-'}</p>
            </div>
        </div>
      </Modal>
    </Container>
  )
}
export default DataPkh
