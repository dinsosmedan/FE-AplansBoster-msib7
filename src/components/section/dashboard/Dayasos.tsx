import BasicCard from '@/components/ui/dashboard/BasicCard'
import BigCard from '@/components/ui/dashboard/BigCard'
import LongCard from '@/components/ui/dashboard/LongCard'
import TitleSign from '@/components/ui/dashboard/TitleSign'

const SectionDayasos = () => {
  return (
    <>
      <div className=" my-12 ">
        <TitleSign text={'Dayasos '} />

        <div className="grid grid-cols-4 gap-5 mt-5">
          <BasicCard props={['Total Jumlah Data Veteran', '705.262', 'Jiwa']} />
          <BasicCard props={['Total DJPM Terdaftar', '705.262', 'Data']} />
          <BasicCard props={['Total Rumah Ibadah ', '705.262', 'Data']} />
          <BasicCard props={['Total BHO Yang Terdaftar', '705.262', 'Organisasi/Lembaga']} />
        </div>
        <div className="grid grid-cols-4 gap-5 mt-5">
          <BasicCard props={['Total KUBE Terdaftar', '705.262', 'Data']} />
          <BasicCard props={['Total POKMAS Terdaftar', '705.262', 'Data']} />
          <BasicCard props={['Total BLTBBM ', '705.262', 'Data']} />
          <BasicCard props={['Total BPNT', '705.262', 'Organisasi/Lembaga']} />
        </div>
        <div className="rounded-xl bg-white mt-5 px-8 py-5 flex flex-col gap-1">
          <BigCard></BigCard>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-5">
          <LongCard props={['POKMAS', 'Perkembangan Data POKMAS']}>
            <LongCard.Chart
              data={[2020, 2021, 2022, 2023, 2024]}
              label={['2020', '2021', '2022', '2023', '2024']}
              backgroundColor={['#F94144', '#F3722C', '#F9C74F', '#90BE6D', '#F8961E']}
            />
          </LongCard>
          <LongCard props={['KUBE', 'Perkembangan Data KUBE']}>
            <LongCard.Chart
              data={[2020, 2021, 2022, 2023, 2024]}
              label={['2020', '2021', '2022', '2023', '2024']}
              backgroundColor={['#F94144', '#F3722C', '#F9C74F', '#90BE6D', '#F8961E']}
            />
          </LongCard>
          <LongCard props={['Rumah Ibadah', 'Persentasi Rumah Ibadah']}>
            <LongCard.Chart
              data={[20, 5, 13, 13, 22, 15, 12]}
              label={['Mesjid', 'Gereja', 'Kuil Hindu', 'Gereja Khatolik', 'Kuil Budha', 'Musholla', 'Kuil Budha']}
              isPercent={true}
              backgroundColor={['#F94144', '#F3722C', '#F9C74F', '#90BE6D', '#F8961E', '#2D9CDB', '#DD2153']}
            />
          </LongCard>
        </div>
      </div>
    </>
  )
}

export default SectionDayasos
