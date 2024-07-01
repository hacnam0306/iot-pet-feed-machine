import { EStepChart } from '@configs'
import React from 'react'

type Props = {
  step: EStepChart
  setStep: React.Dispatch<React.SetStateAction<EStepChart>>
  onChange: (value: EStepChart) => void
}

const data = [
  {
    value: EStepChart.ONE_DAY,
    label: '1d',
  },
  {
    value: EStepChart.ONE_WEEK,
    label: '1W',
  },
  {
    value: EStepChart.ONE_MONTh,
    label: '1M',
  },
  {
    value: EStepChart.THREE_MONTH,
    label: '3M',
  },
]

export const Step = (props: Props) => {
  const { setStep, step, onChange } = props

  return (
    <div className="absolute top-6 left-3 flex flex-row gap-7 items-center justify-center">
      <p className="text-[1rem] text-black">Step:</p>
      {data.map((item) => (
        <button
          onClick={() => {
            setStep(item.value)
            onChange(item.value)
          }}
          disabled={step === item.value}
          key={item.value}
          className={`${
            step === item.value ? 'text-blue-600' : 'text-neutral-500'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
