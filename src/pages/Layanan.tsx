import useTitle from '@/hooks/useTitle'
import { Link } from 'react-router-dom'

const Layanan = () => {
  useTitle('Layanan ')

  return (
    <div className="container bg-white py-5">
      <div className="px-[105px] flex flex-wrap gap-[70px]">
        <CardLayanan nama_bidang={'REHABSOS'} deskripsi={'Rehabilitasi Sosial (Social Rehabilitation)'} url={'/layanan/rehabsos'} />
        <CardLayanan nama_bidang={'LINJAMSOS'} deskripsi={'Rehabilitasi Sosial (Social Rehabilitation)'} url={'/layanan/linjamsos'} />
        <CardLayanan nama_bidang={'DAYASOS'} deskripsi={'Pemberdayaan Sosial dan Penanganan Fakir Miskin (Social Empowerment and Poor Handling)'} url={'/layanan/dayasos'} />

      </div>
    </div>
  )
}

const CardLayanan = ({ nama_bidang, deskripsi, url }: any) => {
  return (
    <>
      <Link to={url}>
        <div className="w-[385px] flex flex-col rounded-[20px] border border-primary overflow-hidden">
          <div className="bg-primary w-[400px] h-[132px] flex justify-center items-center relative">
            {/* <HiOutlineExclamationCircle className="w-[35px] h-[35px] text-white absolute top-1 right-5" /> */}
            <p className="font-extrabold text-[32px] text-white text-center">{nama_bidang}</p>
          </div>
          <div className="bg-white flex p-5  justify-center items-center">
            <p className="text-base text-primary text-center">{deskripsi}</p>
          </div>
        </div>
      </Link>
    </>
  )
}
export default Layanan
