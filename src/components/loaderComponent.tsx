import { BarLoader } from "react-spinners";

export default function LoaderComponent() {
  return (
    <div className='flex h-screen justify-center items-center'>
      <BarLoader color='#6f5814' className="text-3xl" />
    </div>
  )
}