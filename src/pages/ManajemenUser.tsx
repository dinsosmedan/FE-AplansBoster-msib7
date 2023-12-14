import { Container, Modal, Pagination, Password, Search } from '@/components'
import { Button } from '@/components/ui/button'
import { HiOutlinePencilAlt, HiUserAdd } from 'react-icons/hi'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import * as React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import useTitle from '@/hooks/useTitle'
import { HiDocumentArrowUp } from 'react-icons/hi2'
import DropZone, { type FileWithPreview } from '@/components/atoms/DropZone'
import { Label } from '@/components/ui/label';
interface FormValues {
  nik: string
  prodi: string
  identityCard: FileWithPreview[]
}
export default function ManajemenUser() {
  useTitle('Manajemen Pengguna ')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [isShow, setIsShow] = React.useState(false)
  const [isShowEdit, setIsShowEdit] = React.useState(false)
  const forms = useForm<FormValues>({
    mode: 'onTouched'
  })
  const onSubmit = async (values: FormValues) => {
    console.log(values)
  }
  return (
    <Container>
      <div className="flex items-center mb-[18px]">
        <Search placeholder="Search" className="w-[398px] py-[23px]" />
        <Button className="w-fit py-6 px-4 ml-auto bg-primary" onClick={() => setIsShow(true)}>
          <HiUserAdd className="w-6 h-6 text-white" />
          <p className="text-white font-semibold text-sm pl-2 w-max">Tambah User</p>
        </Button>
      </div>

      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-center text-white">NIK</TableHead>
            <TableHead className="text-center text-white">Nama</TableHead>
            <TableHead className="text-center text-white">Email</TableHead>
            <TableHead className="text-center text-white">No. HP</TableHead>
            <TableHead className="text-center text-white">Status</TableHead>
            <TableHead className="text-center text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-left">aaaaaa</TableCell>
            <TableCell className="text-left">aaaaaa</TableCell>
            <TableCell className="text-left">aaaaaa</TableCell>
            <TableCell className="text-left">aaaaaa</TableCell>
            <TableCell className="text-left">Active</TableCell>
            <TableCell className="flex justify-center items-center">
              <Button
                size="icon"
                variant="base"
                className="bg-[#959595] text-white hover:bg-[#828282] hover:text-white"
                onClick={() => setIsShowEdit(true)}
              >
                <HiOutlinePencilAlt className="text-lg" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Pagination
        className="px-5 py-5 flex justify-end"
        currentPage={currentPage}
        totalCount={100}
        pageSize={10}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <Modal isShow={isShow} className="max-h-[calc(100vh-200px)] overflow-y-auto">
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Tambah User</h3>
          <p className="text-sm text-[#A1A1A1]">Perbaharui Data Pengguna</p>
        </Modal.Header>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <FormField
                name="nik"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">NIP</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan NIP " />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="nik"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Email </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Email " />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="nik"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama " />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="nik"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">No. HP</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan No. HP " />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="nik"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Username</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Username " />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="font-semibold dark:text-white">Password</FormLabel>
                    <FormControl>
                      <Password
                        {...field}
                        value={field.value ?? ''}
                        placeholder="Masukkan Password Anda"
                        className=""
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="nik"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Role</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Role" />
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
                name="nik"
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
            </div>
            <Modal.Footer>
              <Button
                variant="outline"
                className="rounded-lg text-primary border-primary"
                onClick={() => setIsShow(false)}
              >
                Cancel
              </Button>
              <Button className="rounded-lg" type="submit">
                Simpan
              </Button>
            </Modal.Footer>
          </form>
        </Form>
      </Modal>
      {/* <Modal isShow={isShowEdit} className="max-h-[calc(200vh-200px)] overflow-y-auto"> */}
      <Modal isShow={isShowEdit} className="">
        <Modal.Header setIsShow={setIsShowEdit} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Tambah User</h3>
          <p className="text-sm text-[#A1A1A1]">Perbaharui Data Pengguna</p>
        </Modal.Header>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div className="overflow-y-auto h-[400px] ">
              <div className="flex items-center justify-center">
                <img
                  className="w-[122px] h-[122px] rounded-full object-cover mb-10"
                  src={'https://ui-avatars.com/api/?name=krisna'}
                  alt=""
                />
              </div>
              <div className="grid grid-cols-2 gap-3 pb-4 pr-5">
                <FormField
                  name="nik"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Masukkan NIK " />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="nik"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Nama </FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Masukkan Nama " />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="nik"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Masukkan Nama " />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="nik"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">No. HP</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Masukkan No. HP " />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="font-semibold dark:text-white">Password</FormLabel>
                      <FormControl>
                        <Password
                          {...field}
                          value={field.value ?? ''}
                          placeholder="Masukkan Password Anda"
                          className=""
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="nik"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Role</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih Role" />
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
              <div className="grid grid-cols-1 pr-4 pt-4 gap-4">
                <FormField
                  name="identityCard"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="flex items-center justify-between">
                        <p className="font-semibold dark:text-white">Foto KTP</p>
                      </FormLabel>
                      <FormControl className="w-[522px]">
                        <DropZone
                          setValue={field.onChange}
                          fileValue={field.value as unknown as FileWithPreview[]}
                          accept={{
                            'image/jpeg': ['.jpg', '.jpeg'],
                            'image/png': ['.png'],
                            'application/pdf': ['.pdf']
                          }}
                          maxFiles={1}
                          id="fotoKtp"
                          Icon={HiDocumentArrowUp}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="nik"
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
              </div>
            </div>
            <Modal.Footer>
              <Button
                variant="outline"
                className="rounded-lg text-primary border-primary"
                onClick={() => setIsShowEdit(false)}
              >
                Cancel
              </Button>
              <Button className="rounded-lg" type="submit">
                Simpan
              </Button>
            </Modal.Footer>
          </form>
        </Form>
      </Modal>
    </Container>
  )
}
