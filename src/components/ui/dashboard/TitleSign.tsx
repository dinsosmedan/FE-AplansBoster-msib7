const TitleSign = ({ text }: any) => {
  return (
    <>
      <div className="title w-full text-white flex justify-center items-center bg-primary text-2xl rounded-[20px] py-5">
        <h1 className="font-extrabold text-[32px]"> {text} </h1>
      </div>
    </>
  )
}

export default TitleSign
