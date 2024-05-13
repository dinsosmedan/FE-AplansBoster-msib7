import React, { useEffect, useState } from 'react'
import { Container, Loading } from '@/components'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useTitleHeader } from '@/store/client'
import { useToastImport } from '@/hooks'
import { FaFileUpload } from 'react-icons/fa'
import { useElderlyCashSocialAssistance } from '@/store/server'

const Lansia = () => {
  const navigate = useNavigate()
  const setBreadcrumb = useTitleHeader((state) => state.setBreadcrumbs)
  const [file, setFile] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const toastImport = useToastImport()
  const [fileName, setFileName] = useState<string>('')

  React.useEffect(() => {
    setBreadcrumb([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/rehabsos', label: 'Rehabsos' },
      { url: '/data-penerima/rehabsos/bstlansia', label: 'BST Lansia' }
    ])
  }, [])

  const { refetch } = useElderlyCashSocialAssistance({})

  React.useEffect(() => {
    void refetch()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
      setFileName(e.target.files[0].name)
    }
  }

  const importData = async () => {
    if (!file) {
      toastImport({
        notFoundCondition: true
      })
      return
    }
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/lansia', {
        method: 'POST',
        body: formData
      })
      if (response.ok) {
        toastImport({
          successCondition: true,
          onSuccess: () => {}
        })
        navigate('/data-penerima/rehabsos/bstlansia')
      } else {
        toastImport({
          failedCondition: true
        })
      }
    } catch (error) {
      console.error('Error during import:', error)
      toastImport({
        failedCondition: true
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="flex flex-col items-center px-[47px] ">
      <div className="w-full mb-3">
        <p className="text-2xl font-bold">Import Data</p>
      </div>
      <div className="flex flex-col justify-center w-full">
        <label
          htmlFor="fileInput"
          className="flex flex-col justify-end items-center  h-60 bg-slate-200 rounded-md cursor-pointer p-3 "
        >
          <FaFileUpload className="h-32 w-32 text-slate-400" />
          <span className=" text-slate-600 mt-2">{fileName || 'Tambahkan File'}</span>{' '}
          <input id="fileInput" type="file" className="hidden" onChange={handleFileChange} />
        </label>

        <section className="flex items-center justify-end">
          <div className="flex items-center gap-3">
            <div className="w-fit flex items-end justify-end" onClick={importData}>
              <Button className="font-bold mt-3">
                {loading && <Loading />}
                Submit
              </Button>
            </div>
            <Button
              variant="outline"
              className="rounded-lg text-primary border-primary font-bold  mt-3"
              onClick={() => navigate('/data-penerima/rehabsos/bstlansia')}
            >
              Cancel
            </Button>
          </div>
        </section>
      </div>
    </Container>
  )
}

export default Lansia
