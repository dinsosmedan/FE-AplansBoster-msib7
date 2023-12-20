import { Loading } from '@/components'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAlert } from '@/store/client'
import { useChangeProfileUser, useGetMePublic } from '@/store/server'
import React from 'react'
import { useForm } from 'react-hook-form'
import { HiPencil } from 'react-icons/hi2'

interface FormValues {
  nik: string
  name: string
  email: string
  phoneNumber: string
}

export default function ChangeProfile() {
  const { alert } = useAlert()
  const { data: user, isLoading, isSuccess: isSuccessGet } = useGetMePublic()
  const { mutate: updateProfile, isLoading: isLoadingUpdate } = useChangeProfileUser()
  const forms = useForm<FormValues>({
    mode: 'onTouched'
  })
  const onSubmit = async (values: FormValues) => {
    const { name, email, phoneNumber } = values
    updateProfile(
      { name, email, phoneNumber },
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
  React.useEffect(() => {
    if (isSuccessGet) {
      forms.reset({
        name: user?.data.name,
        email: user?.data.email,
        phoneNumber: user?.data.phoneNumber as string,
        nik: user.data.identityNumber
      })
    }
  }, [isSuccessGet])

  if (isLoading && isLoadingUpdate) {
    return <Loading />
  }
  return (
    <div className="bg-white lg:w-[90%] w-[90%] h-[100%]  md:p-10 py-10 shadow-sm rounded-lg mt-10 lg:mt-0 mx-auto">
      <p className="md:text-[28px] text-[24px]  font-semibold ml-7">Profil</p>
      <p className="text-[14px] ml-7 text-[#8b8b8b]">Ubah profile akun Kamu disini</p>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)}>
          <div className=" grid grid-cols-1 gap-7 px-7 pt-[50px]">
            <FormField
              name="nik"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="text"
                      placeholder="Masukkan NIK"
                      readOnly={true}
                      disabled
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="name"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Nama Anda" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Email" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="phoneNumber"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">No. Telepon</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Nomor Telepon" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-5 pt-20 px-7 items-center">
            <Button className="md:w-[200px] w-[100%] h-[50px]">
              <p className="text-lg">Ubah</p>
              <HiPencil className="w-4 h-4 ml-3 mb-1" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
