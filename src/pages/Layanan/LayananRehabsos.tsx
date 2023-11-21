import useTitle from '@/hooks/useTitle'
import { LucidePlus } from 'lucide-react'
import { Link } from 'react-router-dom'

const LayananRehabsos = () => {
    useTitle('Layanan Rehabsos ')

    return (
        <div className="container bg-white py-5 ">
            <h1 className='font-bold text-3xl p-5' >Rehabsos</h1>
            <div className="px-[105px] flex flex-wrap gap-[70px]">
                <CardLayananRehabsos title={'Anak Anak'} deskripsi={'Children'} url={'/layanan/rehabsos'} />
                <CardLayananRehabsos title={'Disabilitas'} deskripsi={'Disability'} url={'/layanan/rehabsos'} />
                <CardLayananRehabsos title={'Korban Perdagangan Orang'} deskripsi={'People Trade'} url={'/layanan/rehabsos'} />
                <CardLayananRehabsos title={'Rehabilitasi Sosial'} deskripsi={'The Elderly'} url={'/layanan/rehabsos'} />
                <CardLayananRehabsos title={'Tanda Daftar / Izin Operasional Lks'} deskripsi={'Rehabilitasi Sosial (Social Rehabilitation)'} url={'/layanan/rehabsos'} />
                <CardLayananRehabsos title={'Tuna Sosial'} deskripsi={'Rehabilitasi Sosial (Social Rehabilitation)'} url={'/layanan/rehabsos'} />

            </div>
        </div>
    )
}

const CardLayananRehabsos = ({ title, deskripsi, url }: any) => {
    return (
        <>
            <div className="w-[385px] flex flex-col rounded-[20px] border border-primary overflow-hidden">
                <div className="bg-primary w-[400px] h-[170px] flex flex-col gap-5 justify-center items-center relative  ">
                    <p className="font-extrabold text-[32px] text-white text-center p-5">{title}</p>
                    <p className="font-normal text-[16px] pb-[15px] text-white text-center">{deskripsi}</p>
                </div>
                <Link to={url}>
                    <div className="bg-white flex p-5  gap-3 justify-center items-center text-lg text-primary text-center">
                        <LucidePlus className="text-xl" />
                        <p className='font-bold' >Input Data</p>
                    </div>
                </Link>
            </div>
        </>
    )
}
export default LayananRehabsos
