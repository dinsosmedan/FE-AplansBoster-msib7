import { ForbidenNumber, NotFoundIllustration } from '@/assets'
import { Button } from '@/components/ui/button'
import { HiArrowLeft } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

export default function Forbidden() {
  const navigate = useNavigate()
  return (
    <main className="flex relative justify-center items-center h-screen max-h-screen overflow-hidden">
      <section className="lg:flex justify-between items-center gap-[140px]">
        <img src={NotFoundIllustration} alt="not-found-illustration" className="h-96" />
        <div className="flex flex-col gap-9 px-16 items-center">
          <img src={ForbidenNumber} alt="403" className="h-36" />
          <span className="font-medium text-xl max-w-xs text-center">
            Anda tidak memiliki hak untuk mengakses fitur ini
          </span>
          <Button
            variant="outline"
            className="text-primary border-primary gap-3 rounded-lg font-bold"
            onClick={() => navigate('/')}
          >
            <HiArrowLeft className="text-xl" />
            <span>Back to Home</span>
          </Button>
        </div>
      </section>
      <div className="w-96 h-96 opacity-20 bg-rose-600 rounded-full blur-3xl absolute -top-32 -left-32" />
      <div className="w-96 h-96 opacity-20 bg-rose-600 rounded-full blur-3xl absolute -bottom-48 -right-32" />
    </main>
  )
}
