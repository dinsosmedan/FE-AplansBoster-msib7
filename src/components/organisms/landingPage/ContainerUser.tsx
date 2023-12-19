interface ContainerUserProps {
  title: string
  children?: React.ReactNode
}

export default function ContainerUser({ title, children }: ContainerUserProps) {
  return (
    <section className="bg-[#F9F9F9] w-full h-full pb-20">
      <div className="md:px-11 lg:py-11 px-5 py-20">
        <div className="px-10 py-[50px] bg-white shadow">
          <p className="md:text-xl text-lg font-semibold">{title}</p>
          {children}
        </div>
      </div>
    </section>
  )
}
