import { useNavigate } from 'react-router-dom'
import { useTitle } from '@/hooks'

import RegCard from '@/components/organisms/RegCard'




export default function Regulasi() {
    const navigate = useNavigate()
    useTitle('Regulasi')
  
    return (
        <section className="bg-[#F9F9F9]">
            <section className="h-[250px] w-full bg-[url('@/assets/images/bg-cek-bansos.png')] bg-cover relative">
                <div className="flex items-center justify-center h-full">
                <h1 className="lg:text-5xl md:text-3xl text-5xl font-bold text-white">
                Regulasi <span className="text-[#FFB60A]">Dinas Sosial</span>
                </h1>
                </div>
            </section>

            <section className="py-[25px] md:px-10 px-2 bg-[rgb(249,249,249)] relative overflow-hidden pb-20 mb-[100px]" >
            <div className="items-center justify-between h-full ">             
                <div className="md:px-10 bg- white min-h-[calc(100vh-10px-104px)]">
                    <h2 className='font-bold text-lg lg:text-3xl mb-3'> 
                    1. Penanganan Fakir Miskin (PFM)
                    </h2>
                    <div className="grid gap-x-2 gap-y-4">
                        <RegCard title={'PERATURAN MENTERI SOSIAL REPUBLIK INDONESIA NOMOR 25 TAHUN 2019'} 
                        subTitle={'Tentang Karang Taruna'} 
                        pdfFileName={'./PFM/PERMENSOS_NOMOR_25_TAHUN_2019.pdf'} 
                        />
                        <RegCard title={'PERATURAN WALI KOTA NOMOR 32 TAHUN 2021'} 
                        subTitle={'Tentang Pemberian Dana Jasa Pelayanan Kepada Warga Pelayan Masyarakat'} 
                        pdfFileName={'./PFM/PERWAL_32_TAHUN_2021_TENTANG_DANA_JASA_PELAYANAN-1.pdf'} 
                        />
                        <RegCard title={'PERATURAN WALI KOTA MEDAN NOMOR 33 TAHUN 2021'} 
                        subTitle={'Tentang Kriteria Fakir Miskin dan Orang Tidak Mampu di Kota Medan'} 
                        pdfFileName={'./PFM/Perwal_Nomor_33_Tahun_2021.pdf'} 
                        />
                        <RegCard title={'PERATURAN WALI KOTA MEDAN NOMOR 22 TAHUN 2022'} 
                        subTitle={'Tentang Tata Cara Penganggaran, Pelaksanaan, dan Penatausahaan, Pelaporan dan Pertanggungjawaban serta Monitoring dan Evaluasi Hibah dan Bantuan Sosial yang Bersumber dari Anggaran Pendapatan dan Belanja Daerah Kota Medan'} 
                        pdfFileName={'./PFM/perwal-nomor-22-tahun-2022__2022-07-04-033916.pdf'} 
                        />
                    </div>

                    <h2 className='font-bold text-lg lg:text-3xl mb-5 mt-10'> 
                    2. Rehabilitasi Sosial (Rehabsos)
                    </h2>
                    <div className="grid gap-x-2 gap-y-4">
                        <RegCard title={'SURAT EDARAN MENTERI SOSIAL NOMOR 2 TAHUN 2023'} 
                        subTitle={'Tentang Penertiban Kegiatan Eksploitasi dan/atau Kegiatan Mengemis yang Memanfaatkan Lanjut Usia, Anak, Penyandang Disabilitas, dan/atau Kelompok Rentan Lainnya'} 
                        pdfFileName={'./REHABSOS/SE_MENTERI_SOSIAL_NOMOR_2_TAHUN_2023.pdf'} 
                        />
                        <RegCard title={'PERATURAN PEMERINTAH REPUBLIK INDONESIA NOMOR 2 TAHUN 2018'} 
                        subTitle={'Tentang Standar Pelayanan Minimal'} 
                        pdfFileName={'/REHABSOS/PERATURAN_PEMERINTAH_NOMOR_2_TAHUN_2018_STANDAR_PELAYANAN_MINIMAL.pdf'} 
                        />
                        <RegCard title={'PERATURAN MENTERI SOSIAL REPUBLIK INDONESIA NOMOR 16 TAHUN 2019'} 
                        subTitle={'Tentang Standar Nasional Rehabilitasi Sosial'} 
                        pdfFileName={'./REHABSOS/PERMENSOS_NOMOR_16_TAHUN_2019_STANDARD_NASIONAL_REHABILITASI_SOSIAL.PDF'}  
                        />
                        <RegCard title={'PERATURAN DAERAH KOTA MEDAN NOMOR 6 TAHUN 2003'} 
                        subTitle={'Tentang Larangan Gelandangan dan Pengemisan Serta Praktek Susila di Kota Medan'} 
                        pdfFileName={'./REHABSOS/PERDA_NOMOR_6_TAHUN_2003.pdf'} 
                        />
                        <RegCard title={'PERATURAN DAERAH KOTA MEDAN NOMOR 10 TAHUN 2021'} 
                        subTitle={'Tentang Ketenteraman dan Ketertiban Umum '} 
                        pdfFileName={'./REHABSOS/PERDA_NO_10_TAHUN_2021_KETENTRAMAN_KETERTIBAN_UMUM.pdf'} 
                        />
                        <RegCard title={'PERATURAN WALI KOTA MEDAN NOMOR 69 TAHUN 2022'} 
                        subTitle={'Tentang Pedoman Pemberian Bantuan Sosial Tunai Bagi Penyandang Disabilitas dan Lanjut Usia di Kota Medan'} 
                        pdfFileName={'./REHABSOS/PERWAL_NOMOR_69_TAHUN_2022.pdf'} 
                        />
                    </div>

                    <h2 className='font-bold text-lg lg:text-3xl mb-5 mt-10'> 
                    3. Perlindungan dan Jaminan Sosial (Linjamsos)
                    </h2>
                    <div className="grid gap-x-2 gap-y-4">
                        <RegCard title={'SURAT KEPUTUSAN DIREKTUR JENDERAL PERLINDUNGAN DAN JAMINAN SOSIAL NOMOR 8/3/BS.00.01/1/2024'} 
                        subTitle={'Tentang Petunjuk Teknis Pelaksanaan Program Keluarga Harapan'} 
                        pdfFileName={'./LINJAMSOS/8, SK DIRJEN LJS TTG JUKNIS PELAKSANAAN PKH TAHUN 2024.pdf'} 
                        />
                        <RegCard title={'SURAT EDARAN MENTERI SOSIAL NOMOR 202/MS/C/12/2018'} 
                        subTitle={'Tentang Dukungan Dana Daerah Penyertaan PKH Minimal 5%'} 
                        pdfFileName={'./LINJAMSOS/Dukungan Dana Daerah Penyertaan PKH Minimal 5%.pdf'} 
                        />
                        <RegCard title={'PERATURAN WALI KOTA MEDAN NOMOR 64 TAHUN 2023'} 
                        subTitle={'Tentang Pedoman Pemberian Bantuan Biaya Pendidikan dan Beasiswa Bagi Mahasiswa di Kota Medan'} 
                        pdfFileName={'./LINJAMSOS/Perwal Bantuan Biaya Pendidikan 2023.pdf'}  
                        />
                        
                    </div>
                </div>
                </div>
                

                
            </section>
            

            
        </section>

    )
}