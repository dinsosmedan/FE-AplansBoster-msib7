interface FormAuthContainerProps {
  title: string
  children?: React.ReactNode
}

export default function FormAuthContainer({ title, children }: FormAuthContainerProps) {
  return (
    <div className="rounded-xl py-[55px] px-[80px] shadow-lg bg-white">
      <h1 className="text-3xl font-semibold text-center">{title}</h1>
      {children}
    </div>
  )
}
