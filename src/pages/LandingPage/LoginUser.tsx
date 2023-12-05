import { Logo, MedanBerkahLogo } from '@/assets'
import { Password } from '@/components'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

interface FormFields {
  email: string
  password: string
}

export default function LoginUser() {
  const forms = useForm<FormFields>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: FormFields) => {
    console.log({ data })
  }

  return (
    <section className="py-[106px] font-poppins flex flex-col justify-center items-center gap-[30px] bg-[#F9F9F9]">
      <div className="flex flex-col gap-6 items-center">
        <img src={MedanBerkahLogo} alt="medan berkah" className="w-[310px]" />
        <img src={Logo} alt="aplans boster" className="w-[461px]" />
      </div>
      <div className="rounded-xl py-[55px] px-[80px] border border-zinc-200 bg-white">
        <h1 className="text-3xl font-semibold text-center">Masuk Akun</h1>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)}>
            <FormField
              name="email"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="mt-[30px] mb-5">
                  <FormLabel className="font-semibold dark:text-white">Email</FormLabel>
                  <FormControl className="w-[522px]">
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="text"
                      placeholder="Masukkan Email Anda"
                      className="rounded-lg py-6"
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
                  <FormLabel className="font-semibold dark:text-white">Password</FormLabel>
                  <FormControl className="w-[522px]">
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
            <Button className="rounded-lg w-full py-6 mb-6 mt-[30px] text-lg">Masuk</Button>
            <Link to="/user/forgot-password" className="text-primary">
              <p className="text-center">Lupa Password?</p>
            </Link>
            <div className="border-t border-[#BDBDBD] pt-6 mt-6">
              <Button className="bg-[#00923F] hover:bg-[#00923F]/80 rounded-lg w-full py-6 text-lg">Buat Akun</Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  )
}
