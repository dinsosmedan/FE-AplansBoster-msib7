import { Container, Modal, Pagination, Search } from '@/components'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useTitle } from '@/hooks'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { HiArrowUpTray, HiNewspaper } from 'react-icons/hi2'
import * as React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { useAlert } from '@/store/client'

interface FormValues {
  jenisEvent: string
  jadwalAwal: string
  jadwalAkhir: string
  tahunNotifikasi: string
  tahunAnggaran: string
  jumlahPeserta: string
  batch: string
}

const Event = () => {
  useTitle('Event')
const { alert } = useAlert()

  const [isShow, setIsShow] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const forms = useForm<FormValues>({ mode: 'onTouched' })

  const onSubmit = async (values: any) => {
    console.log(values)
  }
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
  return (
    <Container>
      <div className="flex justify-between py-5 ">
        <Search placeholder="Search" className="w-[398px] py-[23px]" />
        <Button className="w-[166px] h-[56px]" onClick={() => setIsShow(true)}>
          <HiNewspaper className="w-6 h-6" />
          <p className="text-base ml-3 ">Tambah Event</p>
        </Button>
      </div>
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">No</TableHead>
            <TableHead className="text-white">Jenis Event</TableHead>
            <TableHead className="text-white">Jadwal Awal</TableHead>
            <TableHead className="text-white">Jadwal Akhir</TableHead>
            <TableHead className="text-white">Jumlah Peserta</TableHead>
            <TableHead className="text-white">Batch</TableHead>
            <TableHead className="text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-center">1</TableCell>
            <TableCell className="text-center">Bantuan Biaya Pendidikan (BBP)</TableCell>
            <TableCell className="text-center">16 Juni 2023 12:12</TableCell>
            <TableCell className="text-center">16 Juni 2023 12:12</TableCell>
            <TableCell className="text-center">600</TableCell>
            <TableCell className="text-center">3</TableCell>
            <TableCell className="flex items-center justify-center">
              <Button
                size="icon"
                variant="base"
                className="bg-[#959595] text-white hover:bg-[#828282] hover:text-white"
              >
                <HiOutlinePencilAlt className="text-lg" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Modal isShow={isShow} className="md:max-w-3xl max-h-[calc(100vh-50px)] overflow-y-auto">
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Tambah Event</h3>
          <p className="text-sm text-[#A1A1A1]">Tambah Data Event</p>
        </Modal.Header>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <FormField
              name="jenisEvent"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Jenis Event</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jenis Event" />
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
            <div className="grid grid-cols-2 gap-3">
              <FormField
                name="jadwalAwal"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Jadwal Awal</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Pilih Jadwal Awal" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="jadwalAkhir"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Jadwal Akhir</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Pilih Jadwal Akhir" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="tahunNotifikasi"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Tanggal Notifikasi</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="0/100" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="tahunAnggaran"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Tahun Anggaran</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Masukkan Tahun Anggaran" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="jumlahPeserta"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Jumlah Peserta</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="0/100" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="batch"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Masukkan Batch</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Masukkan Batch" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <div className="w-full text-center">
          <p className="text-2xl font-bold">Berkas BBP</p>
        </div>
        <div className="grid gap-5">
          <div className="flex h-[105px] border-dashed border-2 border-primary rounded-md">
            <div className="m-auto flex flex-col justify-center items-center">
              <HiArrowUpTray className="h-6 w-6 text-primary" />
              <p className="font-bold text-base text-center px-[50px]">Pengummuman Beasiswa Gel II</p>
            </div>
          </div>
          <div className="flex h-[105px] border-dashed border-2 border-primary rounded-md">
            <div className="m-auto flex flex-col justify-center items-center">
              <HiArrowUpTray className="h-6 w-6 text-primary" />
              <p className="font-bold text-base text-center text px-[50px]">
                Biodata Mahasiswa Calon Penerima Bantuan Biaya Pendidikan
              </p>
            </div>
          </div>
          <div className="flex h-[105px] border-dashed border-2 border-primary rounded-md">
            <div className="m-auto flex flex-col justify-center items-center">
              <HiArrowUpTray className="h-6 w-6 text-primary" />
              <p className="font-bold text-base text-center px-[50px]">
                Template Surat Permohonan Ditujukan Kepada Bapak Wali Kota Medan Cq. Kepala Dinas Sosial Kota Medan
              </p>
            </div>
          </div>
          <div className="flex h-[105px] border-dashed border-2 border-primary rounded-md">
            <div className="m-auto flex flex-col justify-center items-center">
              <HiArrowUpTray className="h-6 w-6 text-primary" />
              <p className="font-bold text-base text-center px-[50px]">
                Template Surat Pernyataan Tidak Menerima Beasiswa/Bantuan Biaya Pendidikan Dari Sumber Lain
              </p>
            </div>
          </div>
          <div className="flex h-[105px] border-dashed border-2 border-primary rounded-md">
            <div className="m-auto flex flex-col justify-center items-center">
              <HiArrowUpTray className="h-6 w-6 text-primary" />
              <p className="font-bold text-base text-center">
                Template Surat Pernyataan Tidak Berstatus Sebagai Aparatur Sipil Negara (ASN)
              </p>
            </div>
          </div>
        </div>
        <Modal.Footer>
          <Button variant="outline" className="rounded-lg text-primary border-primary" onClick={() => setIsShow(false)}>
            Cancel
          </Button>
          <Button className="rounded-lg" type="submit" onClick={showAlert}>
            Tambah Data
          </Button>
        </Modal.Footer>
      </Modal>
      <Pagination
        className="px-5 py-5 flex justify-end"
        currentPage={currentPage}
        totalCount={100}
        pageSize={10}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Container>
  )
}

export default Event
