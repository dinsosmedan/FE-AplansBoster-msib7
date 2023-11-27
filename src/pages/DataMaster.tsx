import { Modal, Search } from "@/components"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useTitle } from "@/hooks"
import React from "react"
import { useForm } from "react-hook-form"
import { HiOutlineExclamationCircle, HiPlus } from "react-icons/hi2"
import { Link } from "react-router-dom"

const TableDataMaster = () => {
  return (
    <>
      <Table>
        <TableHeader className="bg-primary">
          <TableRow className="text-center">
            <TableHead className="text-white">NIK</TableHead>
            <TableHead className="text-white">No.KK</TableHead>
            <TableHead className="text-white">Nama</TableHead>
            <TableHead className="text-white">Kecamatan</TableHead>
            <TableHead className="text-white">Kelurahan</TableHead>
            <TableHead className="text-white">Tahun</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="text-center">
            <TableCell className="">198608212009012001</TableCell>
            <TableCell>198608212009012001</TableCell>
            <TableCell>Syamsul</TableCell>
            <TableCell className="">KrisnaCuki</TableCell>
            <TableCell className="">KrisnaPemai</TableCell>
            <TableCell className="">2023</TableCell>
            <TableCell className="">DTKS</TableCell>
            <TableCell className="">
              <Link to="/data-master/info-datamaster">
                <Button variant="base" size="icon">
                  <HiOutlineExclamationCircle className="h-7 w-7" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
          <TableRow className="text-center">
            <TableCell className="">198608212009012001</TableCell>
            <TableCell>198608212009012001</TableCell>
            <TableCell>Syamsul</TableCell>
            <TableCell className="">KrisnaCuki</TableCell>
            <TableCell className="">KrisnaPemai</TableCell>
            <TableCell className="">2023</TableCell>
            <TableCell className="">DTKS</TableCell>
            <TableCell className="">
              <Link to="/data-master/info-datamaster">
                <Button variant="base" size="icon">
                  <HiOutlineExclamationCircle className="h-7 w-7" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
          <TableRow className="text-center">
            <TableCell className="">198608212009012001</TableCell>
            <TableCell>198608212009012001</TableCell>
            <TableCell>Syamsul</TableCell>
            <TableCell className="">KrisnaCuki</TableCell>
            <TableCell className="">KrisnaPemai</TableCell>
            <TableCell className="">2023</TableCell>
            <TableCell className="">DTKS</TableCell>
            <TableCell className="">
              <Link to="/data-master/info-datamaster">
                <Button variant="base" size="icon">
                  <HiOutlineExclamationCircle className="h-7 w-7" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
          <TableRow className="text-center">
            <TableCell className="">198608212009012001</TableCell>
            <TableCell>198608212009012001</TableCell>
            <TableCell>Syamsul</TableCell>
            <TableCell className="">KrisnaCuki</TableCell>
            <TableCell className="">KrisnaPemai</TableCell>
            <TableCell className="">2023</TableCell>
            <TableCell className="">DTKS</TableCell>
            <TableCell className="">
              <Link to="/data-master/info-datamaster">
                <Button variant="base" size="icon">
                  <HiOutlineExclamationCircle className="h-7 w-7" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
          <TableRow className="text-center">
            <TableCell className="">198608212009012001</TableCell>
            <TableCell>198608212009012001</TableCell>
            <TableCell>Syamsul</TableCell>
            <TableCell className="">KrisnaCuki</TableCell>
            <TableCell className="">KrisnaPemai</TableCell>
            <TableCell className="">2023</TableCell>
            <TableCell className="">DTKS</TableCell>
            <TableCell className="">
              <Link to="/data-master/info-datamaster">
                <Button variant="base" size="icon">
                  <HiOutlineExclamationCircle className="h-7 w-7" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
          <TableRow className="text-center">
            <TableCell className="">198608212009012001</TableCell>
            <TableCell>198608212009012001</TableCell>
            <TableCell>Syamsul</TableCell>
            <TableCell className="">KrisnaCuki</TableCell>
            <TableCell className="">KrisnaPemai</TableCell>
            <TableCell className="">2023</TableCell>
            <TableCell className="">DTKS</TableCell>
            <TableCell className="">
              <Link to="/data-master/info-datamaster">
                <Button variant="base" size="icon">
                  <HiOutlineExclamationCircle className="h-7 w-7" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}
const DataMaster = () => {
  useTitle('Data Master  ')
  interface FormValues {
    nik: number,
    noKk: number,
    nama: string,
    alamat: string,
    kota: string,
    kecamatan: string,
    kelurahan: string,
    agama: string,
    tempatLahir: string,
    tanggalLahir: string,
    jenisKelamin: string,
    pendidikanTerakhir: string,
    pekerjaan: string,
    golonganDarah: string,
    statusKawin: string,
    kewarganegaraan: string,
    namaIbu: string,
    namaBapak: string,
    statusDtks: string
  }
  const [isShow, setIsShow] = React.useState(false)
  const formsCreate = useForm<FormValues>({
    mode: 'onTouched',
  })
  const onSubmit = async (values: any) => {
    console.log(values)
  }

  return (
    <div className="container bg-white py-5">
      <div className="w-full flex flex-row justify-between">
        <Search placeholder="Search" className="h-[54px] w-1/3" />
        <Button className="bg-primary w-[159px] flex mx-auto rounded-xl py-8" onClick={() => setIsShow(true)}>
          <HiPlus className="w-6 h-6 text-white" />
          <p className="font-bold text-sm text-white">Tambah Data</p>
        </Button>
      </div>
      <div className="w-full flex flex-row gap-5 my-5">
        <div className="w-[20%]">
          <Select>
            <SelectTrigger className="border-primary bg-white text-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Kecamatan" />
            </SelectTrigger>
            <SelectContent className="border-primary text-primary">
              <SelectItem value="m@example.com">Krisna Asu</SelectItem>
              <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
              <SelectItem value="m@support.com">The Little Krishna</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-[20%]">
          <Select>
            <SelectTrigger className="border-primary bg-white text-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Kelurahan" />
            </SelectTrigger>
            <SelectContent className="border-primary text-primary">
              <SelectItem value="m@example.com">Krisna Asu</SelectItem>
              <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
              <SelectItem value="m@support.com">The Little Krishna</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-[20%]">
          <Select>
            <SelectTrigger className="border-primary bg-white text-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Tahun" />
            </SelectTrigger>
            <SelectContent className="border-primary text-primary">
              <SelectItem value="m@example.com">Krisna Asu</SelectItem>
              <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
              <SelectItem value="m@support.com">The Little Krishna</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-[20%]">
          <Select>
            <SelectTrigger className="border-primary bg-white text-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="border-primary text-primary">
              <SelectItem value="m@example.com">Krisna Asu</SelectItem>
              <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
              <SelectItem value="m@support.com">The Little Krishna</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-[20%]">
          <Select>
            <SelectTrigger className="border-primary bg-white text-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Export" />
            </SelectTrigger>
            <SelectContent className="border-primary text-primary">
              <SelectItem value="m@example.com">Krisna Asu</SelectItem>
              <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
              <SelectItem value="m@support.com">The Little Krishna</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <TableDataMaster />
      <Modal isShow={isShow} className="md:max-w-4xl max-h-[calc(100vh-50px)] overflow-y-auto">
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
          <Button className="rounded-lg" type="submit">Tambah Data</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DataMaster
