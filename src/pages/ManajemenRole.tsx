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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { MultiSelect } from '@/components/atoms/multiselect'
import { useForm } from 'react-hook-form'

const ManajemenRole = () => {
  const forms = useForm<any>({
    mode: 'onTouched'
  })

  const onSubmit = async (values: any) => {
    console.log(values)
  }

  return (
    <div className="container bg-white py-5 flex flex-col w-full">
      <div className="flex items-center mb-4">
        <div className="w-[398px] h-14 border rounded-xl flex flex-row items-center">
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
          <DialogContent className="w-[764px] h-[410px]">
            <DialogHeader>
              <DialogTitle className="font-semibold text-3xl">Tambah Role</DialogTitle>
              <DialogDescription className="text-base pt-3">Masukkan Data Role Baru</DialogDescription>
            </DialogHeader>
            <div className="grid gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-start text-base">
                  Role
                </Label>
                <Input id="name" placeholder="Masukkan Role" className="col-span-3" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-start text-base">
                  Status
                </Label>
                <Input id="Status" placeholder="Pilih Akses" className="col-span-3" />
              </div>
            </div>
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
            <TableHead className="w-[158px] h-[67px] text-center text-white">Role</TableHead>
            <TableHead className="w-[740px] h-[67px] text-center text-white">Akses Menu</TableHead>
            <TableHead className="w-[93px] h-[67px] text-center text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-base text-center">Oza Puki</TableCell>
            <TableCell className="text-base text-center">
              Dashboard,layanan,Data Penerima,Profiling Masyarakat,Data DTKS,Data Pengajuan
            </TableCell>
            <TableCell className="text-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="bg-transparent">
                    <HiPencilSquare className="w-6 h-6" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[764px] h-[410px]">
                  <DialogHeader>
                    <DialogTitle className="font-semibold text-3xl">Edit Role</DialogTitle>
                    <DialogDescription className="text-base pt-3">Edit Data Role</DialogDescription>
                  </DialogHeader>
                  <Form {...forms}>
                    <form onSubmit={forms.handleSubmit(onSubmit)} className="grid gap-2">
                      <div className="flex flex-col gap-2">
                        <FormField
                          name="password"
                          control={forms.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold dark:text-white">Kata Sandi</FormLabel>
                              <FormControl>
                                <Input {...field} type="password" placeholder="At least 8 characters" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="permision" className="text-start text-base">
                          Permision
                        </Label>
                        <FormField
                          control={forms.control}
                          name="industry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Select Frameworks</FormLabel>
                              <MultiSelect
                                selected={field.value}
                                options={[
                                  {
                                    value: 'next.js',
                                    label: 'Next.js'
                                  },
                                  {
                                    value: 'sveltekit',
                                    label: 'SvelteKit'
                                  },
                                  {
                                    value: 'nuxt.js',
                                    label: 'Nuxt.js'
                                  },
                                  {
                                    value: 'remix',
                                    label: 'Remix'
                                  },
                                  {
                                    value: 'astro',
                                    label: 'Astro'
                                  },
                                  {
                                    value: 'wordpress',
                                    label: 'WordPress'
                                  },
                                  {
                                    value: 'express.js',
                                    label: 'Express.js'
                                  }
                                ]}
                                {...field}
                                className="sm:w-[510px]"
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />{' '}
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

export default ManajemenRole
