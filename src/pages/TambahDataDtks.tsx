import React, { useState } from 'react'
import { Container, Loading } from '@/components'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useTitleHeader } from '@/store/client'
import {
  useCreateBusinessGroup,
  useGetBeneficaryByNIK,
  useGetBusinessGroupById,
  useGetKecamatan,
  useGetKelurahan,
  useUpdateJointBusiness
} from '@/store/server'
import { yupResolver } from '@hookform/resolvers/yup'
import { kubeValidation } from '@/lib/validations/dayasos.validation'
import { useNotFound, useToastNik } from '@/hooks'

const Lansia = () => {
  const navigate = useNavigate()
  const setBreadcrumb = useTitleHeader((state) => state.setBreadcrumbs)
  const [file, setFile] = useState<any>(null)
  const Excel = async () => {
    if (!file) {
      alert('Please select a file')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    let result = await fetch('http://127.0.0.1:8000/api/excel', {
      method: 'POST',
      body: formData
    })

    // Jika request berhasil, lanjutkan dengan tindakan tambah data
    if (result.ok) {
      // Lakukan pengolahan data dari file di sini
      // Misalnya, baca data dari file Excel dan simpan ke dalam state atau variable
      // const processedData = processDataFromFile(file)

      // Setelah mendapatkan data dari file, Anda dapat mengintegrasikannya dengan logika tambah data
      // Contoh: forms.setValue('nama', processedData.nama)
      // forms.setValue('nik', processedData.nik)
      // forms.setValue('kecamatan', processedData.kecamatan)
      // forms.setValue('kelurahan', processedData.kelurahan)

      alert('Data added')
    } else {
      alert('Failed to upload file')
    }
  }

  React.useEffect(() => {
    setBreadcrumb([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/rehabsos', label: 'Rehabsos' },
      { url: '/data-penerima/rehabsos/anakpanti', label: 'Anak Di Luar Panti' }
    ])
  }, [])

  return (
    <Container className="py-10 px-[47px]">
      <div className="w-full text-center">
        <p className="text-2xl font-bold">Import Data</p>
      </div>
      <div className="App">
        <input type="file" onChange={(e) => setFile(e.target.files![0])} />
        <Button className="font-bold" onClick={Excel}>
          Submit
        </Button>
      </div>
    </Container>
  )
}

export default Lansia
