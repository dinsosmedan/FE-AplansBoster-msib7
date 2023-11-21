import useTitle from '@/hooks/useTitle'
import { LucidePlus } from 'lucide-react'
import { Link } from 'react-router-dom'

const LayananLinjamsos = () => {
    useTitle('Layanan Linjamsos ')

    return (
        <div className="container bg-white py-5 ">
            <h1 className='font-bold text-3xl p-5' >Linjamsos</h1>
            <div className="px-[105px] flex flex-wrap gap-[70px]">
                <CardLayananLinjamsos title={'Bantuan Biaya \n  Pendidikan'} deskripsi={'Education Financial Aid'} url={'/layanan/rehabsos'} />
                <CardLayananLinjamsos title={'Penerima Bantuan Iuran (PBI)'} deskripsi={'Premium Assistance Beneficiary'} url={'/layanan/rehabsos'} />
                <CardLayananLinjamsos title={'Penanganan Kelompok Rentan'} deskripsi={'Program Keluarga Harapan (PKH)'} url={'/layanan/rehabsos'} />
                <CardLayananLinjamsos title={'Program Keluarga Harapan (PKH)'} deskripsi={'Family Home Program'} url={'/layanan/rehabsos'} />
                <CardLayananLinjamsos title={'Surat Keterangan Tidak Mampu (SKTM)'} deskripsi={'Indigency Certificate'} url={'/layanan/rehabsos'} />
            </div>
        </div>
    )
}

const CardLayananLinjamsos = ({ title, deskripsi, url }: any) => {
    return (
        <>
            <div className="w-[385px] flex flex-col rounded-[20px] border border-primary overflow-hidden">
                <div className="bg-primary w-[400px] h-[170px] flex flex-col gap-5 justify-center items-center   p-3 ">
                    <p className="font-extrabold text-3xl text-white text-center p-5">{title}</p>
                    <p className="font-normal text-base	 text-white text-center pb-[15px]">{deskripsi}</p>
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
export default LayananLinjamsos
