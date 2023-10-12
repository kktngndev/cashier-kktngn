type Props = {
  name: string
}


export default async function CardLabelComponent({ name }: Props) {
  return (
    <div className="flex items-center justify-center h-12 w-24 border-2 rounded-2xl border-hacienda-950 bg-hacienda-200 hover:bg-hacienda-700 transition-all text-hacienda-950 hover:text-white">
      <p className="text-sm font-bold ">{ name }</p>
    </div>
  )
}
