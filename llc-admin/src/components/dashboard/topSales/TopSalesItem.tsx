import { StarOutlined } from '@ant-design/icons'
import React from 'react'
import { RowItem } from './RowItem'

type Props = {
  option: {
    price?: string
    priceMonth?: string
    sold?: string
    inventory?: string
    rate?: string
    totalProductSold?: string
    totalOrder?: string
    totalSales?: string
    revenue?: string
    totalPackageSold?: string
  }
}

export const TopSalesItem = (props: Props) => {
  const {
    inventory,
    price,
    priceMonth,
    rate,
    revenue,
    sold,
    totalOrder,
    totalPackageSold,
    totalProductSold,
    totalSales,
  } = props.option
  return (
    <div className="col-span-1 border-[1px] border-slate-300 rounded-[4px] mt-12">
      <div className="px-8 py-3">
        <p className="text-black text-[18px] font-medium text-center">
          Top sales of week
        </p>
        <p className="text-red-500 text-[20px] font-semibold text-center">
          BHA Natural 100%
        </p>
        <div className="flex flex-row gap-8">
          <img
            src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1839&q=80"
            alt="example"
            className="h-[11rem] w-[11rem] object-cover"
          />
          <div>
            {price && (
              <RowItem data={price} icon={<StarOutlined size={24} />} />
            )}
            {priceMonth && (
              <RowItem data={priceMonth} icon={<StarOutlined size={24} />} />
            )}
            {rate && <RowItem data={rate} icon={<StarOutlined size={24} />} />}
            {sold && <RowItem data={sold} icon={<StarOutlined size={24} />} />}
            {inventory && (
              <RowItem
                data={`Inventory ${inventory}`}
                icon={<StarOutlined size={24} />}
              />
            )}
          </div>
        </div>
        <div className="min-h-[12rem] mt-6">
          {totalProductSold && (
            <RowItem
              data={totalProductSold}
              title={'Total number of product sold'}
            />
          )}
          {totalPackageSold && (
            <RowItem
              data={totalPackageSold}
              title={'Total number of package sold'}
            />
          )}
          {totalOrder && (
            <RowItem data={totalOrder} title={'Total number of order'} />
          )}
          {totalSales && <RowItem data={totalSales} title={'total sales'} />}
          {revenue && <RowItem data={revenue} title={'Revenue'} />}
        </div>
      </div>
      <div className="w-full h-[1px] bg-slate-300 mb-4" />
      <div className="px-8 py-3">
        <p className="text-black text-[18px] text-center">
          {'Top sales (Last 3 month)'}
        </p>
        <div className="grid grid-cols-3 mt-14">
          <div className="flex flex-col items-center rounded-[4px] col-span-1">
            <img
              src="https://images.unsplash.com/photo-1613336026275-d6d473084e85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="coffee"
              className="h-[84px] w-[84px] object-contain"
            />
            <p className="text[16px] text-black">Coffee</p>
          </div>
          <div className="flex flex-col items-center rounded-[4px] col-span-1">
            <img
              src="https://images.unsplash.com/photo-1613336026275-d6d473084e85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="coffee"
              className="h-[84px] w-[84px] object-contain"
            />
            <p className="text[16px] text-black">Coffee</p>
          </div>
          <div className="flex flex-col items-center rounded-[4px] col-span-1">
            <img
              src="https://images.unsplash.com/photo-1613336026275-d6d473084e85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="coffee"
              className="h-[84px] w-[84px] object-contain"
            />
            <p className="text[16px] text-black">Coffee</p>
          </div>
        </div>
      </div>
    </div>
  )
}
