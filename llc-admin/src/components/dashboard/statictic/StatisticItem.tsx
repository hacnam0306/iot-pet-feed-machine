import {
  CarOutlined,
  DollarOutlined,
  GiftOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import React from 'react'
// type 1 = users } type 2  = subscribers  3 orders 4 income

export enum ETypeStatic {
  USERS = 'new users',
  ORDERS = 'orders',
  SUBSCRIBERS = 'new subscribers',
  INCOME = 'Total income',
}
const IconType = {
  [`${ETypeStatic.USERS}`]: () => (
    <UsergroupAddOutlined
      size={36}
      style={{
        fontSize: 36,
      }}
    />
  ),
  [`${ETypeStatic.ORDERS}`]: () => (
    <GiftOutlined
      size={36}
      style={{
        fontSize: 36,
      }}
    />
  ),
  [`${ETypeStatic.SUBSCRIBERS}`]: () => (
    <GiftOutlined
      size={36}
      style={{
        fontSize: 36,
      }}
    />
  ),
  [`${ETypeStatic.INCOME}`]: () => (
    <DollarOutlined
      size={36}
      style={{
        fontSize: 36,
      }}
    />
  ),
}
const stringType = {
  [`${ETypeStatic.USERS}`]: ' new users from last month',
  [`${ETypeStatic.ORDERS}`]: ' new orders of this month',
  [`${ETypeStatic.SUBSCRIBERS}`]: ' new subscribers from last month',
  [`${ETypeStatic.INCOME}`]: ' Total income of month',
}
const stringHeaderType = {
  [`${ETypeStatic.USERS}`]: 'Total users ',
  [`${ETypeStatic.ORDERS}`]: 'Total orders',
  [`${ETypeStatic.SUBSCRIBERS}`]: 'New subscribers',
  [`${ETypeStatic.INCOME}`]: 'Total income ',
}
export const StatisticItem = ({
  data,
  type,
  totalUser,
}: {
  data: number | string
  type: ETypeStatic
  totalUser?: number | string
}) => {
  return (
    <div className="px-4 py-3 col-span-4 grid grid-cols-2 border-[1px] rounded-[4px]">
      <div className="col-span-1 flex flex-col items-start justify-between">
        {IconType[type]()}
        <p className="text-[14px] text-black">
          {type !== ETypeStatic.INCOME && (
            <span className="text-blue-500 inline-block">{data || 0} </span>
          )}
          {stringType[type]}
        </p>
      </div>
      <div className="col-span-1 flex flex-1 flex-col items-end justify-between">
        <p className="text-[16px]  text-black block">
          {stringHeaderType[type]}
        </p>
        {
          <b className="text-[24px] text-black block self-end ">
            {totalUser || 0}
          </b>
        }
      </div>
    </div>
  )
}
