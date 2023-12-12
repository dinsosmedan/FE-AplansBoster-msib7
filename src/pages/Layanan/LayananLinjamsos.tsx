import { CardSub, Container } from '@/components'
import useTitle from '@/hooks/useTitle'

const LayananLinjamsos = () => {
  useTitle('Layanan / Linjamsos ')

  return (
    <Container className="px-[120px]">
      <h1 className="font-bold text-2xl ">LINJAMSOS</h1>
      <div className="grid grid-cols-2 gap-x-[85px] gap-y-10 mt-10">
        <CardSub
          title="Bantuan Biaya Pendidikan"
          subTitle="Education Financial Aid"
          href="/data-penerima/linjamsos/bbp"
        />
        <CardSub
          title="Penerima Bantuan Iuran (PBI)"
          subTitle="Premium Assistance Beneficiary"
          href="/data-penerima/linjamsos/pbi"
        />
        <CardSub
          title="Penanganan Kelompok Rentan"
          subTitle="Vulnerable Group Handling"
          href="/layanan/linjamsos/Pkr"
        />
        <CardSub
          title="Program Keluarga Harapan (PKH)"
          subTitle="Family Home Program"
          href="/data-penerima/linjamsos/pkh"
        />
        <CardSub
          title="Surat Keterangan Tidak Mampu (SKTM)"
          subTitle="Indigency Certificate"
          href="/layanan/linjamsos/Sktm"
        />
        <CardSub title="Tidak Terdaftar" subTitle="Unregister" href="/layanan/linjamsos/unregister" />
      </div>
    </Container>
  )
}
export default LayananLinjamsos
