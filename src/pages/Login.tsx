import { loginFn } from '@/api/auth.api'
import { BgLogin, Logo } from '@/assets'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Spinner from '@/components/ui/spinner'
import useTitle from '@/hooks/useTitle'
import { useLogin } from '@/store/server'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

interface FormValues {
  email: string
  password: string
}

export default function Login() {
  useTitle('Login ')
  const { mutate: Login, isLoading, status } = useLogin();
  const forms = useForm<FormValues>({
    mode: 'onTouched'
  })

  const onSubmit = async (values: FormValues) => {

    Login(values)

  }
  // console.log(status);

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
                  name="email"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Email</FormLabel>
                      <FormControl>
                        <InputWithError field={field} status={status} />
                      </FormControl>
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
                        <Input {...field} type="password" placeholder="At least 8 characters" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Link to="/forgot-password" className="text-[#1E4AE9] text-right text-sm hover:underline font-medium">
                  Lupa Kata Sandi?
                </Link>
                <Button className="py-6 text-[17px] font-normal">
                  {
                    isLoading ? <Spinner /> : 'Masuk'
                  }

                </Button>
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

const InputWithError = ({ field, status }: any) => {
  return (
    <>
      <Input {...field} type="email" placeholder="Example@email.com" />
      {status == 'error' ? <p className="text-red-700"> Username Atau Password Salah</p> : null}
    </>
  )
}