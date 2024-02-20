import React from 'react'

const StockCardListUI = ({tableData, activeTab}) => {
  return (
    <div>
      <div class="flex justify-between gap-x-6 mt-2 border bg-whiteColor py-4 px-4 mx-4 rounded-2xl">
    <div class="flex min-w-0 gap-x-4">
      <div class="min-w-0 flex-auto">
        <p class="text-sm font-semibold leading-6 text-gray-900">{tableData.name}</p>
        <p class="mt-1 truncate text-xs leading-5 text-gray-500">{tableData.index}</p>
      </div>
    </div>
    <div class="shrink-0 flex flex-col items-end">
      <p class="text-sm leading-6 text-gray-900">{tableData.trade_price}</p>
      <p class="mt-1 text-xs leading-5 text-lightGreenColor" dir='ltr'>{activeTab == "quantity" ? tableData?.volume : (tableData.pct_change != undefined && tableData.change != undefined) && `(${tableData.pct_change} %) ${tableData.change}`} </p>
    </div>
  </div>
    </div>
  )
}

export default StockCardListUI
