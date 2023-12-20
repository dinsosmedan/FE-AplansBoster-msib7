import { Logo } from '@/assets'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import useTitle from '@/hooks/useTitle'
import { type IErrorResponse } from '@/lib/types/user.type'
import { type ForgetPasswordInput, forgetPasswordValidation } from '@/lib/validations/auth.validation'
import { useAlert } from '@/store/client'
import { useForgetPassword } from '@/store/server'
import { yupResolver } from '@hookform/resolvers/yup'
import { type AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { BsChevronLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  const { alert } = useAlert()
  useTitle('Lupa Password')
  const { mutate: Forgot, isLoading } = useForgetPassword()

  const forms = useForm<ForgetPasswordInput>({
    mode: 'onTouched',
    resolver: yupResolver(forgetPasswordValidation),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async (values: ForgetPasswordInput) => {
    Forgot(values, {
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
        void alert({
          title: 'Cek Email Berhasil',
          description:
            'Yay!  Kami baru saja mengirimkan tautan verifikasi ke email Anda. Silakan periksa kotak masuk atau folder spam Anda untuk melanjutkan proses pemulihan kata sandi.',
          submitText: 'Oke',
          variant: 'success'
        })
      }
    })
  }

  const Navigate = useNavigate()

  return (
    <div className="bg-forgotpassword min-h-screen">
      <div className="flex flex-col  items-center justify-between flex-1 min-h-screen">
        <img className="w-[386.96px] mx-auto pt-[90px]" src={Logo} alt="" />
        <div className="w-[699px] h-[393] bg-white py-[35px] px-[39px] rounded-3xl shadow-xl">
          <Button
            onClick={() => {
              Navigate('/login')
            }}
            variant={'ghost'}
            className="px-3"
          >
            <BsChevronLeft className="text-xl" />
          </Button>
          <div className="text-center">
            <h1 className="font-bold text-3xl">Lupa Password?</h1>
            <h2 className="text-xl pt-5">Masukan Email Anda</h2>
          </div>
          <Form {...forms}>
            <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <FormField
                name="email"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Email</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="email" placeholder="Example@email.com" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="py-6 text-[17px] font-normal" loading={isLoading}>
                Kirim
              </Button>
            </form>
          </Form>
        </div>
        <p className="font-normal text-base text-white text-center pb-[30px]  ">© 2023 ALL RIGHTS RESERVED</p>
      </div>
    </div>
  )
}
