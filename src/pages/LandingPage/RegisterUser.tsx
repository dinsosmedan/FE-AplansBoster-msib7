import { FormAuthContainer, Modal, Password } from '@/components'
import DropZone, { type FileWithPreview } from '@/components/atoms/DropZone'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useTitle } from '@/hooks'
import { registerUserValidation, type RegisterUserFields } from '@/lib/validations/landingPage/auth.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { HiDocumentArrowUp } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import * as React from 'react'
import { Swafoto } from '@/assets'
import { useRegisterPublic } from '@/store/server'
import { useAlert } from '@/store/client'

export default function RegisterUser() {
  useTitle('Buat Akun Baru')
  const { alert } = useAlert()

  const [isShow, setIsShow] = React.useState(false)
  const { mutate: register, isLoading } = useRegisterPublic()

  const forms = useForm<RegisterUserFields>({
    mode: 'onTouched',
    resolver: yupResolver(registerUserValidation)
  })

  const onSubmit = async (data: RegisterUserFields) => {
    register(data, {
      onSuccess: () => {
        void alert({
          title: 'Akun Berhasil Dibuat',
          description: 'Cek Email secara berkala untuk verifikasi akun anda!',
          submitText: 'Oke',
          variant: 'success'
        })
      }
    })
  }

  return (
    <FormAuthContainer title="Buat Akun Baru">
      <Form {...forms}>
        <div className="flex flex-col gap-[30px] mt-[42px]">
          <FormField
            name="name"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                <FormControl className="w-[100%]">
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
          <FormField
            name="identityNumber"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                <FormControl className="w-[100%]">
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
            name="phoneNumber"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold dark:text-white">No. Telepon</FormLabel>
                <FormControl className="w-[100%]">
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
            name="selfie"
            control={forms.control}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="flex items-center justify-between">
                  <p>Swafoto KTP</p>
                  <p className="text-primary underline text-xs cursor-pointer" onClick={() => setIsShow(true)}>
                    Petunjuk Swafoto
                  </p>
                </FormLabel>
                <FormControl className="w-[100%]">
                  <DropZone
                    setValue={field.onChange}
                    fileValue={field.value as unknown as FileWithPreview[]}
                    helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                    maxFiles={1}
                    id="selfie"
                    accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'application/pdf': ['.pdf'] }}
                    Icon={HiDocumentArrowUp}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="identityCard"
            control={forms.control}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Foto KTP</FormLabel>
                <FormControl className="w-[100%]">
                  <DropZone
                    setValue={field.onChange}
                    fileValue={field.value as unknown as FileWithPreview[]}
                    helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                    accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'application/pdf': ['.pdf'] }}
                    maxFiles={1}
                    id="identityCard"
                    Icon={HiDocumentArrowUp}
                  />
                </FormControl>
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
          <Button
            className="rounded-lg w-full md:py-6 md:text-lg"
            loading={isLoading}
            onClick={forms.handleSubmit(onSubmit)}
          >
            Buat Akun
          </Button>
          <Link to="/user/login" className="text-primary">
            <p className="text-center">Sudah Mempunyai Akun?</p>
          </Link>
        </div>
      </Form>
      <Modal isShow={isShow}>
        <Modal.Header setIsShow={setIsShow}>
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Panduan Swafoto</h3>
          <p className="text-sm text-[#A1A1A1] mt-1">List detail dari data keluarga terkait</p>
        </Modal.Header>
        <ol className="list-disc ml-6 text-sm mt-3">
          <li>Seluruh wajah terlihat jelas dan lurus menghadap ke kamera, serta berpakaian dengan sopan dan rapi</li>
          <li>Pencahayaan di sekitar cukup terang.</li>
          <li>Tidak menggunakan aksesoris seperti kacamata, topi, kopiah/peci.</li>
          <li>Tidak menggunakan masker.</li>
          <li>Tidak menggunakan aksesoris seperti kacamata, topi, kopiah/peci.</li>
          <li>Pastikan foto tegak, tidak jauh dan memegang kartu identitas</li>
        </ol>
        <div className="flex flex-col mt-5 gap-4 items-center">
          <h4 className="font-semibold text-xl text-center">Contoh Swafoto</h4>
          <img src={Swafoto} alt="swafoto" className="w-[30%]" />
        </div>
        <Modal.Footer>
          <Button className="rounded-lg mx-auto mt-5" onClick={() => setIsShow(false)}>
            Saya mengerti
          </Button>
        </Modal.Footer>
      </Modal>
    </FormAuthContainer>
  )
}
