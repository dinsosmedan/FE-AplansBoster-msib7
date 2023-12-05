import { Loading, Modal, Pagination } from '@/components'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCreateParams, useDisableBodyScroll, useGetParams, useTitle } from '@/hooks'
import { useGetBeneficiary, useGetKecamatan, useGetKelurahan } from '@/store/server'
import React from 'react'
import { useForm } from 'react-hook-form'
import { HiArrowPath, HiMagnifyingGlass, HiOutlineExclamationCircle, HiPlus } from 'react-icons/hi2'
import { Link, useNavigate } from 'react-router-dom'

interface FormValues {
  nik: number
  noKk: number
  nama: string
  alamat: string
  kota: string
  kecamatan: string
  kelurahan: string
  agama: string
  tempatLahir: string
  tanggalLahir: string
  jenisKelamin: string
  pendidikanTerakhir: string
  pekerjaan: string
  golonganDarah: string
  statusKawin: string
  kewarganegaraan: string
  namaIbu: string
  namaBapak: string
  statusDtks: string
}
interface FormValuesSearch {
  q: string
  kelurahan: string
  kecamatan: string
  isDtks: string
}
const DataMaster = () => {
  useTitle('Data Master  ')
  const navigate = useNavigate()
  const createParams = useCreateParams()
  const { q, kecamatan, kelurahan, page, isDtks } = useGetParams(['q', 'kecamatan', 'kelurahan', 'page', 'isDtks'])
  const [isShow, setIsShow] = React.useState(false)
  const formsCreate = useForm<FormValues>({
    mode: 'onTouched'
  })
  const forms = useForm<FormValuesSearch>({
    defaultValues: {
      q: '',
      kelurahan: '',
      kecamatan: '',
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
  useDisableBodyScroll(isFetching)
  const updateParam = (key: any, value: any) => {
    if (value !== '') {
      createParams({ key, value })
      createParams({ key: 'page', value: '' })
    } else {
      createParams({ key, value: '' })
    }
  }

  const onSubmitSearch = async (values: FormValuesSearch) => {
    updateParam('q', values.q)
    updateParam('kecamatan', values.kecamatan)
    updateParam('kelurahan', values.kelurahan)
    updateParam('isDtks', values.isDtks)

    await refetch()
  }
  const handleReset = () => {
    navigate('/data-master')
    forms.reset()
  }
  if (isLoading) {
    return <Loading />
  }

  const onSubmit = async (values: FormValues) => {
  console.log(values)
  }
  return (
    <div className="container bg-white py-5">
      {isFetching && <Loading />}
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmitSearch)} className="flex flex-col gap-[18px]">
      <div className="w-full flex flex-row justify-between">
      <FormField
              name="q"
              control={forms.control}
              render={({ field }) => (
                <FormItem className='w-[40%]'>
                  <FormControl>
                    <Input {...field} placeholder="Cari berdasarkan NIK atau Nama" />
                  </FormControl>
                </FormItem>
              )}
            />
        <Button type='button' className="bg-primary w-[140px] flex rounded-xl py-4" onClick={() => setIsShow(true)}>
          <HiPlus className="w-6 h-6 text-white" />
          <p className="font-bold text-sm text-white">Tambah Data</p>
        </Button>
      </div>
      <div className="w-full flex flex-row gap-5 my-5">
        <div className="w-[20%]">
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
        </div>
        <div className="w-[20%]">
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
        </div>
        <div className="w-[20%]">
        <FormField
              name="isDtks"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className=" bg-white focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">DTKS</SelectItem>
              <SelectItem value="false">Non DTKS</SelectItem>
            </SelectContent>
          </Select>
          </FormControl>
          </FormItem>
          )}
          />
        </div>
        <div className="flex items-center gap-3 w-[40%] justify-end">
              <Button type="button" variant="outline" className="gap-3 text-primary rounded-lg" onClick={handleReset}>
                <HiArrowPath className="text-lg" />
                <span>Reset</span>
              </Button>
              <Button type='submit' className="gap-2 border-none rounded-lg">
                <HiMagnifyingGlass className="text-lg" />
                <span>Cari Data</span>
              </Button>
            </div>
      </div>
      </form>
      </Form>
      <section className="border rounded-xl mt-5 overflow-hidden">
        <Table>
          <TableHeader className="bg-white">
            <TableRow>
            <TableHead className="text-[#534D59] font-bold text-[15px]">No.</TableHead>
            <TableHead className="text-[#534D59] font-bold text-[15px]">NIK</TableHead>
            <TableHead className="text-[#534D59] font-bold text-[15px]">No.KK</TableHead>
            <TableHead className="text-[#534D59] font-bold text-[15px]">Nama</TableHead>
            <TableHead className="text-[#534D59] font-bold text-[15px]">Kecamatan</TableHead>
            <TableHead className="text-[#534D59] font-bold text-[15px]">Kelurahan</TableHead>
            <TableHead className="text-[#534D59] font-bold text-[15px]">Status</TableHead>
            <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {beneficiary?.data?.length !== 0 ? (
              beneficiary?.data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center bg-[#F9FAFC]">
                    {(beneficiary.meta.currentPage - 1) * beneficiary.meta.perPage + index + 1}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.identityNumber}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.familyCardNumber ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.name ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.address.areaLevel3?.name ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.address.areaLevel4?.name ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.isDtks ? 'DTKS' : 'Non DTKS'}</TableCell>
                  <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                  <Link to={`/data-master/info-datamaster/${item.id}`}>
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
          className="pt-5 flex justify-end"
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={beneficiary?.meta.total as number}
          pageSize={30}
          onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
        />
      ) : null}
      </section>
      <Modal isShow={isShow} className="md:max-w-4xl max-h-[calc(100vh-50px)] overflow-y-auto scroll-custom">
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Tambah Role</h3>
          <p className="text-sm text-[#A1A1A1]">Masukkan Data Role Baru</p>
        </Modal.Header>
        <Form {...formsCreate}>
          <form onSubmit={formsCreate.handleSubmit(onSubmit)} className="mt-2 flex-1 gap-3 flex flex-col">
            <div className="flex flex-row justify-between gap-3">
              <div className="w-11/12">
                <FormField
                  name="nik"
                  control={formsCreate.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Masukkan NIK Masyarakat" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-1/12 flex items-end justify-end">
                <Button className="w-full">Cari</Button>
              </div>
            </div>
            <div className="flex-row flex-wrap grid grid-cols-2 gap-3">
              <FormField
                name="noKk"
                control={formsCreate.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">No.KK</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="Masukkan No.KK" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="nama"
                control={formsCreate.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="alamat"
                control={formsCreate.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Alamat</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Alamat" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="kota"
                control={formsCreate.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Kota/Kabupaten</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kota/Kabupaten" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">Krisna Asu</SelectItem>
                          <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
                          <SelectItem value="m@support.com">The Little Krishna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="kecamatan"
                control={formsCreate.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Kecamatan</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kecamatan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">Krisna Asu</SelectItem>
                          <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
                          <SelectItem value="m@support.com">The Little Krishna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="kelurahan"
                control={formsCreate.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Kelurahan</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kelurahan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">Krisna Asu</SelectItem>
                          <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
                          <SelectItem value="m@support.com">The Little Krishna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="agama"
                control={formsCreate.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Agama</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Agama" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="tempatLahir"
                control={formsCreate.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Tempat Lahir</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Tempat Lahir" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="tanggalLahir"
                control={formsCreate.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Tanggal Lahir</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Tanggal Lahir" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="jenisKelamin"
                control={formsCreate.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Jenis Kelamin</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Jenis Kelamin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">Krisna Asu</SelectItem>
                          <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
                          <SelectItem value="m@support.com">The Little Krishna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="pendidikanTerakhir"
                control={formsCreate.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Pendidikan Terakhir</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Pendidikan Terakhir" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">Krisna Asu</SelectItem>
                          <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
                          <SelectItem value="m@support.com">The Little Krishna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="pekerjaan"
                control={formsCreate.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Pekerjaan</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Pekerjaan" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="golonganDarah"
                control={formsCreate.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Golongan Darah</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Golongan Darah" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="statusKawin"
                control={formsCreate.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Status Kawin</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Status Kawin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">Krisna Asu</SelectItem>
                          <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
                          <SelectItem value="m@support.com">The Little Krishna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="kewarganegaraan"
                control={formsCreate.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Kewarganegaraan</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Kewarganegaraan" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="namaIbu"
                control={formsCreate.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama Ibu</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama Ibu" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="namaBapak"
                control={formsCreate.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama Bapak</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama Bapak" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="statusDtks"
                control={formsCreate.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Status DTKS</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Status DTKS" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">Krisna Asu</SelectItem>
                          <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
                          <SelectItem value="m@support.com">The Little Krishna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <Modal.Footer>
          <Button variant="outline" className="rounded-lg text-primary border-primary" onClick={() => setIsShow(false)}>
            Cancel
          </Button>
          <Button className="rounded-lg" type="submit">
            Tambah Data
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DataMaster
