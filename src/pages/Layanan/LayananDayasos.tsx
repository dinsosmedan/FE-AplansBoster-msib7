import useTitle from '@/hooks/useTitle'
import { LucidePlus } from 'lucide-react'
import { Link } from 'react-router-dom'

const LayananDayasos = () => {
    useTitle('Layanan Dayasos ')

    return (
        <div className="container bg-white py-5 ">
            <h1 className='font-bold text-3xl p-5' >Dayasos</h1>
            <div className="px-[105px] flex flex-wrap gap-[70px]">
                <CardLayananDayasos title={'Bansos Dana Jasa Pelayanan (DJP)'} deskripsi={'(Service Fund Assistance)'} url={'/layanan/Dayasos'} />
                <CardLayananDayasos title={'Bantuan Langsung Tunai BBM'} deskripsi={'Fuel Cash Assistance'} url={'/layanan/Dayasos'} />
                <CardLayananDayasos title={'Bantuan Pangan Non Tunai (BPNT)'} deskripsi={'Joint Business Group'} url={'/layanan/Dayasos'} />
                <CardLayananDayasos title={'Bansos Hibah Organisasi/ Lembaga'} deskripsi={'Organization Grant Assistance'} url={'/layanan/Dayasos'} />
                <CardLayananDayasos title={'Rumah Ibadah'} deskripsi={'House of Worship'} url={'/layanan/Dayasos'} />
                <CardLayananDayasos title={'Veteran'} deskripsi={'Veteran'} url={'/layanan/Dayasos'} />

            </div>
        </div>
    )
}

const CardLayananDayasos = ({ title, deskripsi, url }: any) => {
    return (
        <>
            <div className="w-[385px] flex flex-col rounded-[20px] border border-primary overflow-hidden">
                <div className="bg-primary w-[400px] h-[170px] flex flex-col gap-5 justify-center items-center relative  ">
                    <p className="font-extrabold text-[32px] text-white text-center p-[15px]">{title}</p>
                    <p className="font-normal text-[16px] text-white text-center pb-[15px]">{deskripsi}</p>
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
export default LayananDayasos
