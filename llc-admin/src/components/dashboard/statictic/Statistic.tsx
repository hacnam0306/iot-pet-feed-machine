import React, { useEffect, useState } from 'react'
import { ETypeStatic, StatisticItem } from './StatisticItem'
import {
  getStatisticChartIncome,
  getStatisticChartUSer,
  useAppDispatch,
  useAppSelector,
} from '@redux'
import { EStepChart } from '@configs'
import { getPreviousMonthDate } from '@utils'
import { dashboardAPI } from '@api'

export const Statistic = () => {
  const dispatch = useAppDispatch()

  const [data, setData] = useState({
    users: 0,
    orders: 0,
    subscribers: 0,
    income: '0',
    totalUser: 0,
  })
  const date = getPreviousMonthDate()
  const getData = async () => {
    try {
      const res = await Promise.all([
        dashboardAPI.getStatisticChart(
          {
            from: date.first,
            to: date.last,
            step: EStepChart.ONE_DAY,
          },
          'income'
        ),
        dashboardAPI.getStatisticChart({
          from: date.first,
          to: date.last,
          step: EStepChart.ONE_DAY,
        }),
      ])

      const totalUsersResponse = await dashboardAPI.getStatisticChart({
        step: EStepChart.ONE_DAY,
      })

      const finalTotalUser = totalUsersResponse.data.reduce(
        (accumulator, currentValue) => {
          return accumulator + currentValue.total
        },
        0
      )

      setData({
        users: res[1].data.reduce((a, b) => a + b.total, 0),
        orders: 0,
        subscribers: 0,
        income:
          res[0].data.reduce((a, b) => a + b.total, 0).toLocaleString() + '$',
        totalUser: finalTotalUser,
      })
    } catch (error: any) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="grid grid-cols-8 gap-3">
      <StatisticItem
        data={data.users}
        totalUser={data.totalUser}
        type={ETypeStatic.USERS}
      />
      <StatisticItem data={data.subscribers} type={ETypeStatic.SUBSCRIBERS} />
      <StatisticItem data={data.orders} type={ETypeStatic.ORDERS} />
      <StatisticItem
        data={data.income}
        type={ETypeStatic.INCOME}
        totalUser={data.income}
      />
    </div>
  )
}
