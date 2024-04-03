import React, { useState } from 'react'
import { Container } from '@/components'
import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { useTitleHeader } from '@/store/client'

const Lansia = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const setBreadcrumb = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumb([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/rehabsos', label: 'Rehabsos' },
      { url: '/data-penerima/rehabsos/bstlansia', label: 'BST Lansia' }
    ])
  }, [])

  const [file, setFile] = useState<any>(null)

  const Excel = async () => {
    if (!file) {
      alert('Please select a file')
      return
    }

    console.warn(file)
    const formData = new FormData()
    formData.append('file', file)
    let result = await fetch('http://127.0.0.1:8000/api/v1/lansia', {
      method: 'POST',
      body: formData
    })
    alert('Data Berhasil ditambahkan.')
  }

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
