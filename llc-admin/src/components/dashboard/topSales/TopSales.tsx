import React from 'react'
import { TopSalesItem } from './TopSalesItem'

type Props = {}

export const TopSales = (props: Props) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <TopSalesItem
        option={{
          inventory: '1.5k',
          price: '56$',
          sold: '3k2',
          rate: '4.8',
          totalProductSold: '1.5k',
          totalOrder: '1012',
          revenue: '5000$',
          totalSales: '15.653$',
        }}
      />
      <TopSalesItem
        option={{
          priceMonth: '56$/month',
          sold: '3k2',
          totalPackageSold: '1k5',
          totalOrder: '1012',
          totalSales: '12.123$',
        }}
      />
    </div>
  )
}
