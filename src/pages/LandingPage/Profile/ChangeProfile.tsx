import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { HiPencil } from 'react-icons/hi2'

interface FormValues {
  nik: string
  prodi: string
}

export default function ChangeProfile() {
  const forms = useForm<FormValues>({
    mode: 'onTouched'
  })
  const onSubmit = async (values: FormValues) => {
    console.log(values)
  }
  return (
    <div className="bg-white w-[840px] h-[500px] shadow-xl rounded-lg ">
      <p className="text-[30px] font-semibold ml-7 mt-9">Profil</p>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)}>
          <div className=" grid grid-cols-2 gap-7 px-7 pt-[62px]">
            <FormField
              name="nik"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Nama Anda" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="nik"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Tempat Lahir " />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="nik"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Tempat Lahir " />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="nik"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">No. Telepon</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Tempat Lahir " />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-5 items-center pt-20 pr-7 ">
            <Button variant="outline" className="border-primary text-primary w-[100px] h-[50px]">
              <p className="text-lg font-semibold">Cancel </p>
            </Button>
            <Button className="w-[141px] h-[50px]">
              <p className="text-lg font-semibold">Edit</p>
              <HiPencil className="w-5 h-5 ml-3 mb-1" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
