import { formatRibuan } from '@/hooks'

const BasicCard = ({ props }: any) => {
  const [judul, angka, satuan] = props

  return (
    <>
      <div className="rounded-xl bg-white p-4">
        <div className="flex flex-col gap-2">
          <div className="text-base ">{judul}</div>
          <div className="font-bold text-2xl text-primary">{angka ? formatRibuan(angka) : 0}</div>
          <div className="text-base">{satuan}</div>
        </div>
      </div>
    </>
  )
}

export default BasicCard
