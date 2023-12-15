import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HiAcademicCap, HiArrowDownTray } from 'react-icons/hi2'
import CardLandingPage from '../../../components/organisms/landingPage/CardLandingPage'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function BbpUser() {
  return (
    <section className="bg-[#F9F9F9] px-10 py-[38px]">
      <Tabs defaultValue="open">
        <div className="w-full bg-[#FFFFFF] border border-[#E4E4E4] rounded-lg">
          <p className="text-[26px] font-semibold mb-7 px-10 mt-9">Bantuan Biaya Pendidikan </p>
          <TabsList className="p-0 h-auto bg-white gap-5 px-7">
            <TabsTrigger
              value="open"
              className="shadow-none border-b-8 border-white text-black data-[state=active]:border-primary data-[state=active]:text-primary pb-5"
            >
              <p className="text-lg font-medium">Sedang dibuka</p>
            </TabsTrigger>
            <TabsTrigger
              value="request"
              className="shadow-none border-b-8 border-white text-black data-[state=active]:border-primary data-[state=active]:text-primary pb-5"
            >
              <p className="text-lg font-medium">Proses Pengajuan</p>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="open" className="mt-11 flex flex-row justify-between bg-[#F9F9F9] gap-10">
          <div className="flex flex-col gap-8">
            <CardLandingPage
              className="w-[400px]"
              title={'Bantuan Biaya Pendidikan Gelombang I 2023 '}
              desc={''}
              btnText={'Pendaftaran Pengajuan'}
              icon={HiAcademicCap}
              href={'/'}
            />
            <CardLandingPage
              className="w-[400px]"
              title={'Bantuan Biaya Pendidikan Gelombang II 2023 '}
              desc={''}
              btnText={'Pendaftaran Pengajuan'}
              icon={HiAcademicCap}
              href={'/'}
            />
          </div>
          <section className="flex flex-col gap-8">
            <div className="bg-white rounded-lg px-10 py-14 h-fit">
              <p className="font-semibold text-xl">Informasi Tentang Beasiswa</p>
              <p className="py-6 text-xl indent-24">
                Seluruh Berkas Diunggah/Diupload Soft File Berkas Berjenis Pdf File Jika Pemohon Dinyatakan Lulus
                Administrasi Dan Verivikasi Berkas Yang Akan Disampaikan Melalui Email Yang Didaftarkan, Selanjutnya
                Pemohon Wajib Hadir Sesuai Yang Telah Ditentukan (Tidak Bisa Diwakilkan) Ke Kantor Dinas Sosial Kota
                Medan, Jika Tidak Bisa Hadir Langsung Otomatis Akan Gagal Sebagai Penerima Bantuan Biaya. Sehubungan
                Dengan Peraturan Wali Kota Medan Nomor 64 Tahun 2023 Tentang Bantuan Pendidikan Dan Beasiswa Mahasiswa
                Di Kota Medan
              </p>
              <p className="text-xl font-semibold">Syarat dan Ketentuan</p>
              <div className="py-6">
                <p className="text-xl font-semibold">A. Kriteria Umum Penerima Bantuan Biaya Pendidikan :</p>
                <ol className="list-decimal list-inside">
                  <li className="text-lg">
                    Penduduk Kota Medan Yang Dibuktikan Dengan Kartu Keluarga (Kk) Dan Kartu Tanda Penduduk (Ktp);
                  </li>
                  <li className="text-lg">
                    Salah Satu Orang Tua Dan Pemohon Terdaftar Pada Data Terpadu Kesejahteraan Sosial (Dtks) Kementerian
                    Sosial Republik Indonesia / Terdaftar Di Data Hasil Musyawarah Kelurahan Danprelist;
                  </li>
                  <li className="text-lg">
                    Tidak Sebagai Penerima Beasiswa Baik Dari Universitas Maupun Dari Lembaga Lainnya Serta Program
                    Kartu Indonesia Pintar (Kip) Kuliah;
                  </li>
                  <li className="text-lg">
                    Mahasiswa Terdaftar Pada Perguruan Tinggi Maupun Swasta Yang Terakreditasi;
                  </li>
                  <li className="text-lg">
                    Tidak Berstatus Sebagai Aparatur Sipil Negara (Asn), Tni, Polri, Pegawai Bumn, Bumd Dan Pemerintah
                    Dengan Perjanjian Kerja, Baik Pemohon, Orang Tua Dan Wali.
                  </li>
                </ol>
              </div>
              <p className="text-xl font-semibold">B. Kriteria Khusus Calon Penerima Bantuan Biaya Pendidikan:</p>
              <ol className="list-decimal list-inside">
                <li className="text-lg">
                  Sedang Mengikuti Kuliah Perguruan Tinggi Negeri Maupun Swasta Yang Terakreditasi Dibuktikan
                  Dengansurat Aktif Kuliah Dari Fakultas;
                </li>
                <li className="text-lg">Mahasiswa Terdaftar Pada Jenjang Diploma III, IV Dan Strata I;</li>
                <li className="text-lg">
                  Mahasiswa Dengan Indeks Prestasi Akademik Ipk Minimal3,0 Untuk Perguruan Tinggi Negeri Dan Ipk Minimal
                  3,25 Pada Perguruan Tinggi Swasta;
                </li>
                <li className="text-lg">
                  Masa Perkuliahan Tidak Lebih Dari 8 (Delapan) Semester Untuk Jenjang Strata I Dan - VI Semester Untuk
                  Jenjang Diploma III.
                </li>
              </ol>
              <p className="text-xl font-semibold pt-6">
                C. Syarat Pendaftaran Calon Penerima Bantuan Biaya Pendidikan:
              </p>
              <p>Pemohon Menggugah / Upload Soft File Berkas Berjenis Pdf File, Sebagai Berikut:</p>
              <ol className="list-decimal list-inside">
                <li className="text-lg">
                  Scan Asli Surat Permohonan Ditujukan Kepada Bapak Wali Kota medan Cq. Kepala Dinas Sosial Kota Medan
                  (Ukuran File Maksimal 2 Mb);
                </li>
                <li className="text-lg">Scan Asli Biodata Pribadi (Ukuran File Maksimal 2 Mb);</li>
                <li className="text-lg">
                  Pas Foto Ukuran 3x4 Berwarna Berlatar Belakang Merah(Ukuran File Maksimal 2 Mb);
                </li>
                <li className="text-lg">Scan Asli Kartu Keluarga (Ukuran File Maksimal 2 Mb);</li>
                <li className="text-lg">5. Scan Asli Kartu Tanda Penduduk Elektronik (Ukuran File Maksimal 2 Mb);</li>
                <li className="text-lg">
                  Scan Asli Kartu Mahasiswa Yang Masih Aktif Dan Berlaku(Ukuran File Maksimal 2 Mb);
                </li>
                <li className="text-lg">
                  Scan Asli Surat Keterangan Aktif Kuliah Dari Fakultas(Ukuran File Maksimal 2 Mb) ;
                </li>
                <li className="text-lg">
                  Scan Asli Print Out Dtks Dari Dinas Sosial Kota Medan Atau Surat Keterangan Terdaftar Pada Data Hasil
                  Musyawarah Kelurahan (Prelist); (Yang Terdaftar Dtks Adalah Orang Tua Dan Pemohon Bantuan Biaya
                  Pendidikan) (Ukuran File Maksimal 2 Mb) ;
                </li>
                <li className="text-lg">
                  Scan Asli Surat Pernyataan Yang Bersangkutan Tidak Sedang Menerima Beasiswa/Bantuan Biaya Pendidikan
                  Dari Sumber Lain, Termasuk Tidak Menerima Program Kip Kuliah Bermaterai Cukup (Ukuran File Maksimal 2
                  Mb);
                </li>
                <li className="text-lg">
                  Scan Asli Surat Pernyataan Yang Bersangkutan, Orangtua/Wali Tidak Berstatus Aparatur Sipil Negara,
                  Tni,Polri, Bumn Dan Bumd Serta Tidak Pegawai Pemerintah Dengan Perjanjian Kerja, Bermaterai
                  Cukup(Ukuran File Maksimal 2 Mb);
                </li>
                <li className="text-lg">
                  Scan Asli Transkrip Nilai Terakhir Yaitu Transkrip Nilai Semester Genap Tahun 2023 Yang Dilegalisir
                  Oleh Ptn/Pts Pada Saat Pendaftaran (Ukuran File Maksimal 2 Mb);
                </li>
                <li className="text-lg">
                  Scan Asli Tagihan Uang Kuliah/Sebutan Lain Yang Dipersamakan Atau Bukti Pembayaran Uang Kuliah
                  Terakhir Yaitu Bukti Pembayaran Semester Genap Tahun 2023 (Ukuran File Maksimal 2 Mb);
                </li>
                <li className="text-lg">Scan Asli Rekening Bank Yang Aktif (Ukuran File Maksimal 2 Mb).</li>
              </ol>
              <p className="text-xl font-semibold pt-6">D. Tata Cara Pendaftaran</p>
              <ol className="list-decimal list-inside">
                <li className="text-lg">
                  Setiap Pemohon Harus Melakukan Pendaftaran Melalui Laman:
                  Https://Www.Aplansboster.Pemkomedan.Go.Id/Masyarakat/Beasiswa;
                </li>
                <li className="text-lg">
                  Pemohon Harus Membaca Dan Mengikuti Ketentuan Pendaftaran Dengan Baik Dan Teliti Serta Menyiapkan
                  Terlebih Dahulu Persyaratan Yang Harus Dipenuhi Sebelum Mengisi Formulir Pendaftaran Dan Menggugah /
                  Mengupload Berkas Soft File; ;
                </li>
                <li className="text-lg">
                  Pemohon Mengisi Biodata Dan Kolom Lainnya Serta Menggunggah Berkas Soft File Secara Cermat Setelah
                  Pemohon Memasukkan Nik Pada Laman Tersebut.
                </li>
              </ol>
              <p className="text-xl font-semibold pt-6">E. Ketentuan Lain</p>
              <ol className="list-decimal list-inside">
                <li className="text-lg">
                  Pastikan Dokumen Yang Diunggah / Diupload Dapat Terbaca. Kesalahan Dalam Mengunggah / Upload Dokumen
                  Dapat Mengakibatkan Pemohon Tidak Lulus Seleksi Administrasi;
                </li>
                <li className="text-lg">
                  Semua Informasi Atau Data Yang Disajikan Pada Saat Pendaftaran Berdasarkan Dokumen Asli Secara Benar
                  Dan Dapat Dipertanggungjawabkan. Apabila Data Yang Diisikan Tidak Benar, Maka Pemohon Dapat Dinyatakan
                  Gugur Dan Tidak Dapat Diproses Lebih Lanjut;
                </li>
                <li className="text-lg">
                  Jika Pemohon Dinyatakan Lulus Administrasi Dan Verivikasi Berkas, Maka Akan Dihubungi Melalui Email
                  Yang Didaftarkan;
                </li>
                <li className="text-lg">
                  Para Pemohon Disarankan Untuk Terus Memantau Email Yang Didaftarkan Untuk Melihat Pengumuman Penting
                  Lainnya.
                </li>
              </ol>
              <div className="flex gap-4 items-center py-6 justify-between w-full">
                <p className="text-xl font-semibold max-w-[80%]">Pengumuman Beasiswa Gel II</p>
                <Button variant="outline" className="border-primary border-2 rounded-lg">
                  <p className="text-base text-primary">Unduh</p>
                  <HiArrowDownTray className="text-2xl ml-2 text-primary" />
                </Button>
              </div>
              <div className="flex gap-4 items-center py-6 justify-between w-full">
                <p className="text-xl font-semibold max-w-[80%]">
                  Biodata Mahasiswa Calon Penerima Bantuan Biaya Pendidikan
                </p>
                <Button variant="outline" className="border-primary border-2 rounded-lg">
                  <p className="text-base text-primary">Unduh</p>
                  <HiArrowDownTray className="text-2xl ml-2 text-primary" />
                </Button>
              </div>
              <div className="flex gap-4 items-center py-6 justify-between w-full">
                <p className="text-xl font-semibold max-w-[80%]">
                  Template Surat Permohonan Ditujukan Kepada Bapak Wali Kota Medan Cq. Kepala Dinas Sosial Kota Medan
                </p>
                <Button variant="outline" className="border-primary border-2 rounded-lg">
                  <p className="text-base text-primary">Unduh</p>
                  <HiArrowDownTray className="text-2xl ml-2 text-primary" />
                </Button>
              </div>
              <div className="flex gap-4 items-center py-6 justify-between w-full">
                <p className="text-xl font-semibold max-w-[80%]">
                  Template Surat Pernyataan Tidak Menerima Beasiswa/Bantuan Biaya Pendidikan Dari Sumber Lain{' '}
                </p>
                <Button variant="outline" className="border-primary border-2 rounded-lg">
                  <p className="text-base text-primary">Unduh</p>
                  <HiArrowDownTray className="text-2xl ml-2 text-primary" />
                </Button>
              </div>
              <div className="flex gap-4 items-center py-6 justify-between w-full">
                <p className="text-xl font-semibold max-w-[80%]">
                  Template Surat Pernyataan Tidak Berstatus Sebagai Aparatur Sipil Negara (Asn)
                </p>
                <Button variant="outline" className="border-primary border-2 rounded-lg">
                  <p className="text-base text-primary">Unduh</p>
                  <HiArrowDownTray className="text-2xl ml-2 text-primary" />
                </Button>
              </div>
            </div>
            <Link to={'/user/bbp/register-bbp'}>
              <Button className="w-full py-8">
                <p className="text-xl">Daftar Sekarang</p>
              </Button>
            </Link>
          </section>
        </TabsContent>
        <TabsContent value="request" className="flex flex-row gap-10">
          <div className="w-[40%] h-[349px] bg-white rounded-lg bg-[url('@/assets/images/line-curve.svg')] bg-no-repeat">
            <div className="py-14 px-7">
              <HiAcademicCap className="w-[70px] h-[70px] text-primary" />
              <p className="text-xl  font-semibold py-[26px]">Bantuan Biaya Pendidikan Gelombang I 2023 </p>
              <Button className="disabled:bg-black w-full h-[60px]  " disabled>
                <p className="text-xl text-white">Diproses</p>
              </Button>
            </div>
          </div>
          <div className="bg-white w-[925px]">
            <div className="pt-24 px-[90px] flex flex-row">
              <div className="bg-primary rounded-full w-[70px] h-[70px] flex items-center justify-center">
                <p className="text-white text-[26px]">1</p>
              </div>
              <div className="flex items-center ">
                <div className="border-2 border-dashed w-[250px] h-0 border-primary " />
              </div>
              <div className="bg-white border-2 border-primary rounded-full w-[70px] h-[70px] flex items-center justify-center">
                <p className="text-primary text-[26px]">2</p>
              </div>
              <div className="flex items-center px-2 ">
                <div className="border-2 border-dashed w-[250px] h-0 border-primary " />
              </div>
              <div className="bg-white border-2 border-primary rounded-full w-[70px] h-[70px] flex items-center justify-center">
                <p className="text-primary text-[26px]">3</p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center pt-3 gap-[200px] ">
              <div className="w-[135px] h-[60px] bg-primary rounded-lg flex items-center">
                <p className="text-base text-white text-center">Pengajuan Terkirim</p>
              </div>
              <div className="w-[135px] h-[60px] rounded-lg flex items-center">
                <p className="text-base text-[##858585] text-center">Pengajuan Diproses</p>
              </div>
              <div className="w-[135px] h-[80px] rounded-lg flex items-center">
                <p className="text-base text-[##858585] text-center max-w">Pengajuan Diterima / Ditolak</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
