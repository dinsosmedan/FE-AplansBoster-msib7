import React, { useState, useEffect } from 'react'
import { Container } from '@/components'
import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { useTitleHeader } from '@/store/client'

const Veteran = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  useTitleHeader((state) => state.setBreadcrumbs)([
    { url: '/data-penerima', label: 'Data Penerima' },
    { url: '/data-penerima/dayasos', label: 'Dayasos & PFM' },
    { url: '/data-penerima/dayasos/veteran', label: 'Veteran' }
  ])

  const [file, setFile] = useState<any>(null)

  const Excel = async () => {
    if (!file) {
      alert('Silakan pilih sebuah file')
      return
    }

    console.warn(file)
    const formData = new FormData()
    formData.append('file', file)
    let result = await fetch('http://127.0.0.1:8000/api/v1/importVeteran', {
      method: 'POST',
      body: formData
    })
    alert('Data ditambahkan')
  }

  return (
    <Container className="py-10 px-[47px]">
      <div className="w-full text-center">
        <p className="text-2xl font-bold">Impor Data</p>
      </div>
      <div className="App">
        <input type="file" onChange={(e) => setFile(e.target.files![0])} />
        <Button className="font-bold" onClick={Excel}>
          Kirim
        </Button>
      </div>
    </Container>
  )
}

export default Veteran
