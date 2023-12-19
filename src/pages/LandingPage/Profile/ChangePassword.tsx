import Password from '@/components/atoms/Password'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { type ResetPasswordUserFields, resetPasswordValidation } from '@/lib/validations/landingPage/auth.validation'
import { useAlert } from '@/store/client'
import { useChangePasswordUser } from '@/store/server'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

export default function ChangePassword() {
  const { alert } = useAlert()

  const forms = useForm<ResetPasswordUserFields>({
    mode: 'onTouched',
    resolver: yupResolver(resetPasswordValidation),
    defaultValues: {
      password: '',
      ConfPassword: ''
    }
  })

  const { mutate: ResetPassword, isLoading } = useChangePasswordUser()
  const onSubmit = async (values: ResetPasswordUserFields) => {
    const { password } = values
    ResetPassword(
      { password },
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
    <div className="bg-white lg:w-[90%] w-[90%] h-[100%] shadow-xl rounded-lg pb-28">
      <p className="text-[30px] font-semibold ml-7 mt-9">Ubah Password</p>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-7 px-7 pt-[52px]">
            <FormField
              name="password"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
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
              name="ConfPassword"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
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
            <Button className="w-[200px] h-[50px]" loading={isLoading}>
              <p className="text-lg font-semibold">Ubah Password</p>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
