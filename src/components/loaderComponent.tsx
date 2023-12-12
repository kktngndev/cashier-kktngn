import { BarLoader } from "react-spinners";

export default function LoaderComponent() {
  return (
    <div className='flex h-screen w-screen justify-center items-center fixed top-20'>
      <BarLoader color='#6f5814' className="text-3xl" />
    </div>
  )
}