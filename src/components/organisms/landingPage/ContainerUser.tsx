interface ContainerUserProps {
  title: string
  children?: React.ReactNode
}

export default function ContainerUser({ title, children }: ContainerUserProps) {
  return (
    <section className="bg-[#F9F9F9] w-full h-full">
      <div className="px-11 py-11">
        <div className="px-10 py-[50px] bg-white">
          <p className="text-xl font-semibold">{title}</p>
          {children}
        </div>
      </div>
    </section>
  )
}
