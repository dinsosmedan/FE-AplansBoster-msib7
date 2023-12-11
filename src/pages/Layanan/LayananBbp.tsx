import { Container, Modal, Pagination, Search } from '@/components'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { useAlert } from '@/store/client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineExclamationCircle, HiOutlineEye } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import FilterLayanan from './../../components/atoms/FilterLayanan';

export default function LayananBbp() {
  interface FormValues {
    nik: string
  }
  const { alert } = useAlert()
  const showAlert = () => {
    void alert({
      title: 'User ditambahkan',
      description: 'User berhasil ditambahkan',
      submitText: 'Oke',
      variant: 'success'
    }).then(() => {
      console.log('oke')
    })
  }
  const [isShow, setIsShow] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [isActive, setIsActive] = React.useState('Data Pengajuan')
  const forms = useForm<FormValues>({
    mode: 'onTouched'
  })

  const onSubmit = async (values: FormValues) => {
    console.log(values)
  }
  return (
    <Container>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-row justify-between gap-3 py-6 items-center">
            <div className="w-6/12">
              <FormField
                name="nik"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Search value={field.value} onChange={field.onChange} placeholder="Masukkan Nama / NIK" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-end justify-end m">
              <Button className="bg-primary w-[143px] h-[56px] rounded-xl mr-4">
                <p className="text-white text-base font-bold">Kirim Notifikasi</p>
              </Button>
              <div className="bg-primary px-5 py-4 rounded-xl">
                <p className="text-white text-base font-bold">Total Kuota : 20/100</p>
              </div>
            </div>
          </div>
        </form>
      </Form>
      <FilterLayanan />
      <section className="border rounded-xl mt-5 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-white font-bold text-[15px] bg-primary">NIK</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Nama</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Status DTKS</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Alamat</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">BPNT</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">BLT BBM</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">BPI</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-left bg-[#F9FAFC]">Batch 3</TableCell>
              <TableCell className="text-left bg-[#F9FAFC]">100/100</TableCell>
              <TableCell className="text-left bg-[#F9FAFC]">11-11-2022</TableCell>
              <TableCell className="text-left bg-[#F9FAFC]">11-11-2022</TableCell>
              <TableCell className="text-center bg-[#F9FAFC]">
                <div className="bg-[#E9FFEF] rounded-full flex items-center w-fit gap-2 py-1 px-2 mx-auto">
                  <div className="w-2 h-2 rounded-full bg-[#409261]" />
                  <p className="text-[#409261] text-xs">Aktif</p>
                </div>
              </TableCell>
              <TableCell className="text-left bg-[#F9FAFC]">11-11-2022</TableCell>
              <TableCell className="text-left bg-[#F9FAFC]">11-11-2022</TableCell>
              <TableCell
                className="flex items-center justify-center text-left bg-[#F9FAFC] "
                onClick={() => setIsShow(true)}
              >
                <Button className="py-6">
                  <p className="text-base font-bold pr-3">Action</p>
                  <HiOutlineExclamationCircle className="h-6 w-6" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Modal isShow={isShow} className="md:max-w-3xl max-h-[calc(100vh-50px)] overflow-y-auto">
          <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
            <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Data Pengajuan</h3>
            <p className="text-sm text-[#A1A1A1]">Data Pengajuan BBP</p>
          </Modal.Header>
          <Form {...forms}>
            <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  name="jadwalAwal"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="jadwalAkhir"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="tahunNotifikasi"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="tahunAnggaran"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">IPK</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="jumlahPeserta"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Perguruan Tinggi</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="batch"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Prodi</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="jumlahPeserta"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">No. HP</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="batch"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Jenis Kelamin</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="jumlahPeserta"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Tempat Lahir</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="batch"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Tanggal Lahir</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="jumlahPeserta"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Alamat</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="batch"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Semester</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="jumlahPeserta"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Kecamatan</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="batch"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Kelurahan</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="jumlahPeserta"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">UKT</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="batch"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Batch</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <p className="text-2xl font-bold py-5 text-center">Data Bank</p>
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  name="jumlahPeserta"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">No Rekening/Bank</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="batch"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Jumlah Yang Dibantu</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="jumlahPeserta"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Tahun Anggaran</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="jumlahPeserta"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Status DTKS</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full text-center bg-primary py-3">
                <p className="text-base font-bold text-white">Berkas Mahasiswa</p>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">SURAT PERMOHONAN</p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">PAS FOTO</p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">KARTU KELUARGA</p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">KTP</p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">KTM</p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">SURAT AKTIF KULIAH</p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">SCAN PRINTOUT DTKS</p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">SURAT PERNYATAAN TIDAK MENDAPATKAN BEASISWA</p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">SURAT PERNYATAAN BUKAN ASN</p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">TRANSKRIP NILAI</p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">SCAN BUKU TABUNGAN</p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">BUKTI PEMBAYARAN UKT TERAKHIR</p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <FormField
                name="jenisEvent"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Status</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Status" />
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
                name="jumlahPeserta"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Keterangan</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Masukkan Keterangan" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <Modal.Footer>
            <Button
              variant="cancel"
              className="rounded-lg text-[#898989] bg-[#E4E4E4]"
              onClick={() => setIsShow(false)}
            >
              Cancel
            </Button>
            <Button className="rounded-lg" type="submit" onClick={showAlert}>
              <p className="text-white font-bold">Update</p>
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
      <Pagination
        currentPage={currentPage}
        totalCount={100}
        pageSize={10}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Container>
  )
}
