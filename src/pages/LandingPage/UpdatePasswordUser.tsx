import { FormAuthContainer, Password } from '@/components'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useGetParams, useTitle } from '@/hooks'
import { resetPasswordValidation, type ResetPasswordUserFields } from '@/lib/validations/landingPage/auth.validation'
import { useAlert } from '@/store/client'
import { useResetPasswordUser } from '@/store/server'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

export default function UpdatePasswordUser() {
  useTitle('Reset Password')
  const { alert } = useAlert()
  const forms = useForm<ResetPasswordUserFields>({
    mode: 'onTouched',
    resolver: yupResolver(resetPasswordValidation),
    defaultValues: {
      password: '',
      ConfPassword: ''
    }
  })
  const { mutate: ResetPassword, isLoading } = useResetPasswordUser()

  const { token } = useGetParams(['token'])
  const onSubmit = async (values: ResetPasswordUserFields) => {
    const { password } = values
    ResetPassword(
      { password, token },
      {
        onSuccess: () => {
          void alert({
            title: 'Berhasil Reset Password',
            description: 'Yay! Reset Password Berhasil, Silakan Login kembali!',
            submitText: 'Oke',
            variant: 'success'
          })
        }
      }
    )
  }

  return (
    <FormAuthContainer title="Password Baru">
      <div className="border-t border-[#BDBDBD] pb-[30px] mt-[30px]" />
      <p className="font-poppins mb-[40px] max-w-[431px] text-[15px]">Silahkan Buat Password Anda Yang Baru</p>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-[30px]">
          <FormField
            name="password"
            control={forms.control}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="font-semibold dark:text-white">Password Baru</FormLabel>
                <FormControl className="w-[100%]">
                  <Password
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Masukkan Password Baru"
                    className="py-6 rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="ConfPassword"
            control={forms.control}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="font-semibold dark:text-white">Konfirmasi Password</FormLabel>
                <FormControl className="w-[100%]">
                  <Password
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Konfirmasi Password Baru Anda"
                    className="md:py-6 rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="rounded-lg py-6" loading={isLoading}>
            Ganti Password
          </Button>
        </form>
      </Form>
    </FormAuthContainer>
  )
}
