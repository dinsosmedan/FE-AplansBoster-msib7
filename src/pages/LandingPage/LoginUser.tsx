import { FormAuthContainer, Password } from '@/components'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useTitle } from '@/hooks'
import { type LoginUserFields, loginUserValidation } from '@/lib/validations/landingPage/auth.validation'
import { useLoginPublic } from '@/store/server'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginUser() {
  useTitle('Masuk Akun')
  const navigate = useNavigate()

  const { mutate: loginPublic, isLoading } = useLoginPublic()

  const forms = useForm<LoginUserFields>({
    mode: 'onTouched',
    resolver: yupResolver(loginUserValidation),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginUserFields) => {
    loginPublic(data)
  }

  return (
    <FormAuthContainer title="Masuk Akun">
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)}>
          <FormField
            name="identifier"
            control={forms.control}
            render={({ field }) => (
              <FormItem className="mt-[30px] mb-5">
                <FormLabel className="font-semibold dark:text-white">Email</FormLabel>
                <FormControl className="w-[100%]">
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
                <FormControl className="w-[100%]">
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
          <Button className="rounded-lg w-full md:py-6 mb-6 mt-[30px] md:text-lg" type="submit" loading={isLoading}>
            Masuk
          </Button>
          <Link to="/user/forgot-password" className="text-primary">
            <p className="text-center">Lupa Password?</p>
          </Link>
          <div className="border-t border-[#BDBDBD] pt-6 mt-6">
            <Button
              type="button"
              onClick={() => navigate('/user/register')}
              className="bg-[#00923F] hover:bg-[#00923F]/80 rounded-lg w-full md:py-6 md:text-lg"
            >
              Buat Akun
            </Button>
          </div>
        </form>
      </Form>
    </FormAuthContainer>
  )
}
