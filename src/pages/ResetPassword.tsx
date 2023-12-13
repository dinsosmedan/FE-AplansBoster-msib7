import { Logo } from '@/assets'
import { Password } from '@/components'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import useTitle from '@/hooks/useTitle'
import { useForm } from 'react-hook-form'

export default function ResetPassword() {
  useTitle('Lupa Password')

  interface FormValues {
    email: string
  }

  const forms = useForm<FormValues>({
    mode: 'onTouched'
  })

  const onSubmit = async (values: FormValues) => {
    console.log(values)
  }

  return (
    <div className="bg-forgotpassword min-h-screen">
      <div className="flex flex-col  items-center justify-between flex-1 min-h-screen">
        <img className="w-[386.96px] mx-auto pt-[90px]" src={Logo} alt="" />
        <div className="w-[699px] h-[473] bg-white py-[30px] px-[39px] rounded-3xl shadow-xl">
          <div className="text-center">
            <h1 className="font-bold text-[36px]">Password Baru</h1>
            <h2 className="text-xl pt-[15px]">Masukan Password Baru Anda</h2>
          </div>
          <Form {...forms}>
            <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
              <Button className="py-6 text-[17px] font-normal">Konfirmasi</Button>
            </form>
          </Form>
        </div>
        <p className="font-normal text-base text-white text-center pb-[30px]  ">© 2023 ALL RIGHTS RESERVED</p>
      </div>
    </div>
  )
}
