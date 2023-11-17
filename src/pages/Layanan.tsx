import { HiOutlineExclamationCircle } from 'react-icons/hi'

const Layanan = () => {
  return (
    <div className="container bg-white py-5">
      <div className="px-[105px] flex flex-wrap gap-[70px]">
        <div className="w-[385px] flex flex-col rounded-[20px] border border-primary overflow-hidden">
          <div className="bg-primary w-[400px] h-[132px] flex justify-center items-center relative">
            <HiOutlineExclamationCircle className="w-[35px] h-[35px] text-white absolute top-1 right-5" />
            <p className="font-extrabold text-[32px] text-white text-center">REHABSOS</p>
          </div>
          <div className="bg-white py-10">
            <p className="text-base text-primary text-center">Rehabilitasi Sosial (Social Rehabilitation)</p>
          </div>
        </div>
        <div className=" w-[385px] flex flex-col rounded-[20px] border border-primary overflow-hidden">
          <div className="bg-primary w-[400px] h-[132px] flex justify-center items-center relative ">
            <HiOutlineExclamationCircle className="w-[35px] h-[35px] text-white absolute top-1 right-5" />
            <p className="font-extrabold text-[32px] text-white text-center">REHABSOS</p>
          </div>
          <div className="bg-white py-10">
            <p className="text-base text-primary text-center">Rehabilitasi Sosial (Social Rehabilitation)</p>
          </div>
        </div>
        <div className=" w-[385px] flex flex-col rounded-[20px] border border-primary overflow-hidden">
          <div className="bg-primary w-[400px] h-[132px] flex justify-center items-center relative ">
            <HiOutlineExclamationCircle className="w-[35px] h-[35px] text-white absolute top-1 right-5" />
            <p className="font-extrabold text-[32px] text-white text-center">REHABSOS</p>
          </div>
          <div className="bg-white py-10">
            <p className="text-base text-primary text-center">Rehabilitasi Sosial (Social Rehabilitation)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layanan
