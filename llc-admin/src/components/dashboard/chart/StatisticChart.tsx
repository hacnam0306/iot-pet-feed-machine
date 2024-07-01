/* eslint-disable @typescript-eslint/no-unused-vars */
import { thunkActionLoading } from '@configs'
import { selectDashboardLoading, useAppSelector } from '@redux'
import { Skeleton } from 'antd'
import LineChartComponent from './LineChartComponent'

type Props = {
  humidityArray: number[]
  temperatureArray: number[]
}

export const StatisticChart = (props: Props) => {
  const { temperatureArray, humidityArray } = props

  const getStatisticUserLoading = useAppSelector((state) =>
    selectDashboardLoading(
      state,
      thunkActionLoading.GET_STATISTIC_CHART_LOADING
    )
  )
  const getStatisticIncomeLoading = useAppSelector((state) =>
    selectDashboardLoading(
      state,
      thunkActionLoading.GET_STATISTIC_CHART_INCOME_LOADING
    )
  )

  return (
    <div className="pt-3 relative mt-8 pl-[15px]">
      {getStatisticIncomeLoading || getStatisticUserLoading ? (
        <div style={{ height: '500px', width: '100%' }}>
          <Skeleton
            active
            loading={!getStatisticIncomeLoading || !getStatisticUserLoading}
          />
          <Skeleton
            active
            loading={!getStatisticIncomeLoading || !getStatisticUserLoading}
          />
          <Skeleton
            active
            loading={!getStatisticIncomeLoading || !getStatisticUserLoading}
          />
        </div>
      ) : (
        <div className="flex flex--row ">
          <LineChartComponent
            temperatureArray={temperatureArray}
            humidityArray={humidityArray}
          />
        </div>
      )}
    </div>
  )
}
