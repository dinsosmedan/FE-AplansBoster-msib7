import { FormAuthContainer } from '@/components'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useTitle } from '@/hooks'
import { type IErrorResponse } from '@/lib/types/user.type'
import { type ForgetPasswordInput, forgetPasswordValidation } from '@/lib/validations/auth.validation'
import { useAlert } from '@/store/client'
import { useForgetPasswordUser } from '@/store/server'
import { yupResolver } from '@hookform/resolvers/yup'
import { type AxiosError } from 'axios'
import { useForm } from 'react-hook-form'

export default function ForgotPasswordUser() {
  useTitle('Lupa Password')
  const { alert } = useAlert()
  const { mutate: Forgot, isLoading } = useForgetPasswordUser()

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

  return (
    <FormAuthContainer title="Lupa Password">
      <div className="border-t border-[#BDBDBD] pb-[30px] mt-[30px]" />
      <p className="font-poppins mb-[40px] max-w-[431px] text-[15px]">
        Anda akan menerima email untuk mereset Password akun anda
      </p>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-[30px]">
          <FormField
            name="email"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold dark:text-white">Email</FormLabel>
                <FormControl className="w-[100%]">
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    type="email"
                    placeholder="Masukkan Email Anda"
                    className="rounded-lg py-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="rounded-lg md:py-6" loading={isLoading}>
            Kirim
          </Button>
        </form>
      </Form>
    </FormAuthContainer>
  )
}
