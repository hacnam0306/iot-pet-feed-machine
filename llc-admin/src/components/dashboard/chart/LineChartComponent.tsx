import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
interface HumidityChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
  }[]
}

interface TemperatureChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
  }[]
}

type Props = {
  humidityArray: number[]
  temperatureArray: number[]
}

const LineChartComponent = (props: Props) => {
  const { humidityArray, temperatureArray } = props
  const [humidityData, setHumidityData] = useState<HumidityChartData>({
    labels: [],
    datasets: [],
  })

  const [temperatureData, setTemperatureData] = useState<TemperatureChartData>({
    labels: [],
    datasets: [],
  })

  const _labels = ['Time 1', 'Time 2', 'Time 3', 'Time 4', 'Time 5'] // Adjust labels as needed

  return (
    <div className="">
      <Line
        data={{
          labels: _labels,
          datasets: [
            {
              label: 'Humidity',
              data: humidityArray,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        }}
        height={200}
        width={300}
      />
      <Line
        data={{
          labels: _labels,
          datasets: [
            {
              label: 'Temperature',
              data: temperatureArray,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
          ],
        }}
        height={200}
        width={300}
      />
    </div>
  )
}

export default LineChartComponent
