import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CiSearch } from 'react-icons/ci'
import { HiPencilSquare } from 'react-icons/hi2'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { HiUserAdd } from 'react-icons/hi'
import { Badge } from '@/components/ui/badge'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const ManajemenUser = () => {
  interface FormValues {
    role: string
    status: string
  }
  const forms = useForm<FormValues>({
    mode: 'onTouched'
  })
  const onSubmit = async (values: FormValues) => {
    console.log(values)
  }
  return (
    <div className="container bg-white py-5 flex flex-col ">
      <div className="flex items-center mb-4">
        <div className="w-[400px] h-14 border rounded-xl flex flex-row items-center">
          <CiSearch className="w-6 h-6 my-4 mx-[18px]" />
          <Input className="border-0 bg-transparent text-base font-bold" type="text" placeholder="Cari" />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-[160px] h-14 ml-auto bg-primary">
              <HiUserAdd className="w-6 h-6 text-white" />
              <p className=" text-white font-semibold text-sm pl-2">Tambah Role</p>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[764px] h-[578px]">
            <DialogHeader>
              <DialogTitle className="font-semibold text-3xl">Tambah Role</DialogTitle>
              <DialogDescription className="text-base">Masukkan Data Role Baru</DialogDescription>
            </DialogHeader>
            <Form {...forms}>
              <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-start text-base">
                      NIP
                    </Label>
                    <Input id="name" placeholder="Masukkan Role" className="col-span-3" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-start text-base">
                      Email
                    </Label>
                    <Input id="Status" placeholder="Pilih Akses" className="col-span-3" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-start text-base">
                      Nama
                    </Label>
                    <Input id="name" placeholder="Masukkan Role" className="col-span-3" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-start text-base">
                      No. HP
                    </Label>
                    <Input id="Status" placeholder="Pilih Akses" className="col-span-3" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-start text-base">
                      Username
                    </Label>
                    <Input id="name" placeholder="Masukkan Role" className="col-span-3" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <FormField
                      name="role"
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
                </div>
                <div className="flex flex-col gap-2">
                  <FormField
                    name="role"
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
              </form>
            </Form>
            <DialogFooter>
              <button type="submit" className="w-[101px] h-[52px] border-2 rounded-lg border-primary text-primary">
                Cancel
              </button>
              <Button type="submit" className="w-[150px] h-[52px]">
                Tambah Data
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader className="bg-primary text-base ">
          <TableRow>
            <TableHead className="text-center text-white">NIP</TableHead>
            <TableHead className="text-center text-white">Nama</TableHead>
            <TableHead className="text-center text-white">Username</TableHead>
            <TableHead className="text-center text-white">Email</TableHead>
            <TableHead className="text-center text-white">No. HP</TableHead>
            <TableHead className="text-center text-white">Role</TableHead>
            <TableHead className="text-center text-white">Status</TableHead>
            <TableHead className="text-center text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-base text-center">198608212009012001</TableCell>
            <TableCell className="text-base text-center">198608212009012001</TableCell>
            <TableCell className="text-base text-center">Syamsul</TableCell>
            <TableCell className="text-base text-center">elytha79sipayung@gmail.com</TableCell>
            <TableCell className="text-base text-center">081376331191</TableCell>
            <TableCell className="text-base text-center">Admin </TableCell>
            <TableCell className="text-base text-center">
              <Badge variant="outline" className="text-[#409261] bg-[#E9FFEF] rounde-[54px] gap-[7px]">
                <div className="w-2 h-2 rounded-full bg-[#409261]"></div>
                <p> Active</p>
              </Badge>
            </TableCell>
            <TableCell className="text-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="bg-transparent">
                    <HiPencilSquare className="w-6 h-6" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-semibold text-3xl">Edit User</DialogTitle>
                    <DialogDescription className="text-base pt-3">Edit Data User</DialogDescription>
                  </DialogHeader>
                  <Form {...forms}>
                    <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="name" className="text-start text-base">
                            NIP
                          </Label>
                          <Input id="name" placeholder="Masukkan Role" className="col-span-3" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="name" className="text-start text-base">
                            Email
                          </Label>
                          <Input id="Status" placeholder="Pilih Akses" className="col-span-3" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="name" className="text-start text-base">
                            Nama
                          </Label>
                          <Input id="name" placeholder="Masukkan Role" className="col-span-3" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="name" className="text-start text-base">
                            No. HP
                          </Label>
                          <Input id="Status" placeholder="Pilih Akses" className="col-span-3" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="name" className="text-start text-base">
                            Username
                          </Label>
                          <Input id="name" placeholder="Masukkan Role" className="col-span-3" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <FormField
                            name="role"
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
                      </div>
                      <div className="flex flex-col gap-2">
                        <FormField
                          name="role"
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
                    </form>
                  </Form>
                  <DialogFooter>
                    <button
                      type="submit"
                      className="w-[101px] h-[52px] border-2 rounded-lg border-primary text-primary"
                    >
                      Cancel
                    </button>
                    <Button type="submit" className="w-[150px] h-[52px]">
                      Tambah Data
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default ManajemenUser
