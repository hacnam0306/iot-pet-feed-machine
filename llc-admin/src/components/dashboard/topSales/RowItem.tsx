import React from 'react'

type Props = {
  title?: string
  data: string
  icon?: any
}

export const RowItem = (props: Props) => {
  const { title, data, icon } = props

  return (
    <div
      className={`flex flex-row content-center ${
        title ? 'justify-between' : 'justify-start'
      }`}
    >
      {icon}
      <p className="text-[16px] ml-3 text-black">{title}</p>
      <p className="text-[16px] text-black">{data}</p>
    </div>
  )
}
