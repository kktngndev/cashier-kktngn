'use client'
type Props = {
  name: string
  onChange?: (params: any) => void
}

export default function CardLabelComponent({ name, onChange }: Props) {

  return (
    <>
      <input type='radio' onChange={onChange} value={name} id={ name } name="label" >
      </input>
      <label className="trxCategoryLabel" htmlFor={ name }>{ name }</label>
    </>
  )
}
