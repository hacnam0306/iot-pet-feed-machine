/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IChartData } from '@interfaces'
import { Slider } from 'antd'
import { divide } from 'lodash'
import React, { ReactNode, useEffect, useState } from 'react'
import reactotron from 'reactotron-react-js'

type Props = {
  data: IChartData[]
  handleChart: (value: [number, number]) => void
  minDistance: number
}

const SliderComponent = (props: Props) => {
  const { data, handleChart, minDistance = 4 } = props

  const [value, setValue] = useState<[number, number]>([0, 0])
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)
  const [mark, setMark] = useState<
    Record<string | number, ReactNode | any> | undefined
  >()

  useEffect(() => {
    let val: number[] = []
    let markObj: Record<string | number, ReactNode | any> = []
    data.forEach((e, i) => {
      val.push(i)
      if (i % minDistance === 0) {
        markObj[i] = e.day
      }
    })
    setValue([val[0], val[val.length - 1]])
    setMark(markObj)
    setMin(val[0])
    setMax(val[val.length - 1])
  }, [data])

  const handleChange = (newValue: [number, number]) => {
    if (!Array.isArray(newValue)) {
      return
    }
    const distance = Math.min(minDistance, data.length)
    if (newValue[1] - newValue[0] < distance) {
      const clamped = Math.max(newValue[1], distance)
      setValue([clamped - distance, clamped])
      props.handleChart([clamped - distance, clamped])
    } else if (newValue[1] - newValue[0] === distance) {
      const clamped = Math.max(newValue[0], distance)
      setValue([newValue[0], newValue[0] + distance])
      props.handleChart([newValue[0], newValue[0] + distance])
    } else {
      setValue(newValue)
      props.handleChart(newValue)
    }
  }

  return (
    <div>
      <Slider
        value={value}
        range
        min={min}
        max={max}
        onChange={handleChange}
        // marks={mark}
        tooltip={{
          formatter: (e) => {
            return e ? data[e]?.day : ''
          },
        }}
      />
    </div>
  )
}

export default SliderComponent
