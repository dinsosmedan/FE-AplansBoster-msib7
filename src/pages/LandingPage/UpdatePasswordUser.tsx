import { FormAuthContainer, Password } from '@/components'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useTitle } from '@/hooks'
import { type ResetPasswordUserFields } from '@/lib/validations/landingPage/auth.validation'
import { useForm } from 'react-hook-form'

export default function UpdatePasswordUser() {
  useTitle('Reset Password')
  const forms = useForm<ResetPasswordUserFields>({
    mode: 'onTouched'
  })

  const onSubmit = async (values: ResetPasswordUserFields) => {
    console.log(values)
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
                <FormControl className="w-[522px]">
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

          <Button className="rounded-lg py-6">Ganti Password</Button>
        </form>
      </Form>
    </FormAuthContainer>
  )
}
