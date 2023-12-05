import { FormAuthContainer } from '@/components'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useTitle } from '@/hooks'
import { type ForgotPasswordUserFields } from '@/lib/validations/landingPage/auth.validation'
import { useForm } from 'react-hook-form'

export default function ForgotPasswordUser() {
  useTitle('Lupa Password')
  const forms = useForm<ForgotPasswordUserFields>({
    mode: 'onTouched'
  })

  const onSubmit = async (values: ForgotPasswordUserFields) => {
    console.log(values)
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
                <FormControl className="w-[522px]">
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

          <Button className="rounded-lg py-6">Kirim</Button>
        </form>
      </Form>
    </FormAuthContainer>
  )
}
