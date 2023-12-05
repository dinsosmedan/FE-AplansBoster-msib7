import { FormAuthContainer, Password } from '@/components'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useTitle } from '@/hooks'
import { type RegisterUserFields } from '@/lib/validations/landingPage/auth.validation'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export default function RegisterUser() {
  useTitle('Buat Akun Baru')

  const forms = useForm<RegisterUserFields>({
    mode: 'onTouched'
  })

  const onSubmit = async (data: RegisterUserFields) => {
    console.log({ data })
  }

  return (
    <FormAuthContainer title="Buat Akun Baru">
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-[30px] mt-[42px]">
          <FormField
            name="name"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                <FormControl className="w-[522px]">
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    type="text"
                    placeholder="Masukkan Nama Lengkap Anda"
                    className="rounded-lg py-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            name="nik"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                <FormControl className="w-[522px]">
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    type="text"
                    placeholder="Masukkan NIK Anda"
                    className="rounded-lg py-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="noTelp"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold dark:text-white">No. Telepon</FormLabel>
                <FormControl className="w-[522px]">
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    type="text"
                    placeholder="Masukkan No. Telepon Anda"
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
          <Button className="rounded-lg w-full py-6 text-lg">Buat Akun</Button>
          <Link to="/user/login" className="text-primary">
            <p className="text-center">Sudah Mempunyai Akun?</p>
          </Link>
        </form>
      </Form>
    </FormAuthContainer>
  )
}
