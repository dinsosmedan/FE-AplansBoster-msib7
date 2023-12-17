interface FormAuthContainerProps {
  title: string
  children?: React.ReactNode
}

export default function FormAuthContainer({ title, children }: FormAuthContainerProps) {
  return (
    <div className="rounded-xl py-[55px] md:px-[80px] px-[30px] shadow-lg bg-white w-[90%] lg:w-[36%] md:w-[75%]">
      <h1 className="md:text-3xl text-2xl font-semibold text-center">{title}</h1>
      {children}
    </div>
  )
}
