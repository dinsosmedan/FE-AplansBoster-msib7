import BasicCard from '@/components/ui/dashboard/BasicCard'
import LongCard from '@/components/ui/dashboard/LongCard'
import TitleSign from '@/components/ui/dashboard/TitleSign'

const SectionDataDtks = () => {
  return (
    <>
      <div className=" ">
        <TitleSign text={'Data DTKS '} />

        <div className="grid grid-cols-3 gap-5 mt-5">
          <BasicCard props={['Total Data DTKS', '705.262', 'Jiwa']} />
          <BasicCard props={['Jumlah data Non DTKS', '705.262', 'Data']} />
          <BasicCard props={['Jumlah Keluarga Penerima', '705.262', 'Data']} />
        </div>
        <div className="grid grid-cols-3 gap-5 mt-5">
          <LongCard props={['Data DTKS', 'Persentasi Data DTKS']}>
            <LongCard.Chart
              data={[12, 19]}
              isPercent={true}
              label={['DTKS', 'Non DTKS']}
              backgroundColor={['#F94144', '#F3722C']}
            />
          </LongCard>
          <LongCard props={['Jenis Kelamin', 'Persentasi Data DTKS Berdasarkan Jenis Kelamin']}>
            <LongCard.Chart
              data={[30, 15]}
              isPercent={true}
              label={['Laki-laki', 'Perempuan']}
              backgroundColor={['#F94144', '#F3722C']}
            />
          </LongCard>
          <LongCard props={['Prevalensi DTKS Perkecamatan', 'Prevalensi DTKS Perkecamtan']}>
            <LongCard.Tabel />
          </LongCard>
        </div>
      </div>
    </>
  )
}

export default SectionDataDtks
