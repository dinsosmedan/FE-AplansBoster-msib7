import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useTitle } from '@/hooks'
import { BgLogin, Logo } from '@/assets'
import { useLogin } from '@/store/server'

import { type AxiosError } from 'axios'
import { type IErrorResponse } from '@/lib/types/user.type'
import { type LoginInput, loginValidation } from '@/lib/validations/auth.validation'
import { Password } from '@/components'
import { HiArrowLongLeft } from 'react-icons/hi2'
export default function Login() {
  useTitle('Login')
  const { toast } = useToast()
  const { mutate: Login, isLoading } = useLogin()

  const forms = useForm<LoginInput>({
    mode: 'onTouched',
    resolver: yupResolver(loginValidation),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })

  const onSubmit = async (values: LoginInput) => {
    Login(values, {
      onError: (error: AxiosError) => {
        const errorResponse = error.response?.data as IErrorResponse

        if (errorResponse !== undefined) {
          toast({
            variant: 'destructive',
            title: errorResponse.message,
            description: 'There was a problem with your request.'
          })
        }
      },
      onSuccess: () => {
        toast({
          title: 'Login Success',
          description: 'You have successfully logged in.'
        })
      }
    })
  }

  return (
    <main className="py-14 px-36 flex flex-row items-start justify-between h-screen">
      <section className="flex-1 h-full items-center">
        <div className="w-8/12 h-full flex flex-col justify-between">
          <img src={Logo} alt="logo" className="w-full" />
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-bold text-font">Selamat Datang</h1>
              <p className="font-medium text-lg text-[#5b6481]">Silahkan masukkan akun anda untuk tahap selanjutnya</p>
            </div>

            <Form {...forms}>
              <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <FormField
                  name="identifier"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">NIP</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan NIP Anda" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Kata Sandi</FormLabel>
                      <FormControl>
                        <Password {...field} placeholder="Minimal 8 Karakter" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Link to="/forgot-password" className="text-[#1E4AE9] text-right text-sm hover:underline font-medium">
                  Lupa Kata Sandi?
                </Link>
                <Button className="py-6 text-[17px] font-normal" loading={isLoading}>
                  Masuk
                </Button>
                <Link to="/" className="text-primary flex items-center">
                  <HiArrowLongLeft /> <span className="ps-2"> Kembali ke Beranda</span>
                </Link>
              </form>
            </Form>
          </div>
          <p className="text-[#959CB6] text-center text-sm">© 2023 ALL RIGHTS RESERVED</p>
        </div>
      </section>
      <img src={BgLogin} alt="bg" className="shadow-2xl h-full object-cover rounded-3xl" />
    </main>
  )
}
