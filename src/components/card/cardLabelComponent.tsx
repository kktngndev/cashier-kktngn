'use client'
type Props = {
  name: string
  onChange?: (params: any) => void
}

export function CardLabelComponent({ name, onChange }: Props) {

  return (
    <>
      <input type='radio' className="categoryRadio" onChange={onChange} value={name} id={ name } name="label" />
      <label className="trxCategoryLabel" htmlFor={ name }>{ name }</label>
    </>
  )
}
