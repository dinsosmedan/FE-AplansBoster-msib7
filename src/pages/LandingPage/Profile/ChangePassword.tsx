import Password from '@/components/atoms/Password'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'

interface FormValues {
  password: string
}

export default function ChangePassword() {
  const forms = useForm<FormValues>({
    mode: 'onTouched'
  })
  const onSubmit = async (values: FormValues) => {
    console.log(values)
  }
  return (
    <div className="bg-white w-[840px] h-[386px] shadow-xl rounded-lg ">
      <p className="text-[30px] font-semibold ml-7 mt-9">Ubah Password</p>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)}>
          <div className=" grid grid-cols-2 gap-7 px-7 pt-[52px]">
            <FormField
              name="password"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-lg font-semibold dark:text-white">Password</FormLabel>
                  <FormControl>
                    <Password
                      {...field}
                      value={field.value ?? ''}
                      placeholder="Masukkan Password Anda"
                      className="py-6 rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-lg font-semibold dark:text-white">Konfirmasi Password</FormLabel>
                  <FormControl>
                    <Password
                      {...field}
                      value={field.value ?? ''}
                      placeholder="Masukkan Password Anda"
                      className="py-6 rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-5 items-center pt-[62px] pr-7 ">
            <Button className="w-[200px] h-[50px]">
              <p className="text-lg font-semibold">Ubah Password</p>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
