import { ImSpinner2 } from 'react-icons/im'

export default function Loading() {
  return (
    <section className="fixed bg-gray-900/75 inset-0 z-[999999999999999999999999999999999999999999999999999]">
      <div className="bg-white rounded-2xl w-20 h-20 flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <ImSpinner2 className="animate-spin m-auto text-3xl text-primary" />
      </div>
    </section>
  )
}
