import React, { Fragment } from 'react'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'

const GroupedRowsTable = ({tableData, tableHeadings}) => {


  console.log(tableData, "stocks table data")
    
// const locations = [
//     {
//       name: {sector: 'Material', arabic_sector: "المواد الأساسية"},
//       data: [
//         { change: 0.3, name: "ينساب", pct_change: 0.77, trade_price:39.25, volume: 733978 },
//         { change: 0.3, name: "ينساب", pct_change: 0.77, trade_price:39.25, volume: 733978 },
//       ],
//     },
//     {
//       name: {sector: "Capital Goods", arabic_sector: "السلع الرأسمالية"},
//       data: [
//         { change: 0.3, name: "ينساب", pct_change: 0.77, trade_price:39.25, volume: 733978 },
//         { change: 0.3, name: "ينساب", pct_change: 0.77, trade_price:39.25, volume: 733978 },
//       ],
//     },{
//       name: {sector: 'Material', arabic_sector: "المواد الأساسية"},
//       data: [
//         { change: -0.3, name: "ينساب", pct_change: -0.77, trade_price:39.25, volume: 733978 },
//         { change: 0.3, name: "ينساب", pct_change: 0.77, trade_price:39.25, volume: 733978 },
//       ],
//     },
//     {
//       name: {sector: "Capital Goods", arabic_sector: "السلع الرأسمالية"},
//       data: [
//         { change: 0.3, name: "ينساب", pct_change: 0.77, trade_price:39.25, volume: 733978 },
//         { change: 0.3, name: "ينساب", pct_change: 0.77, trade_price:39.25, volume: 733978 },
//       ],
//     },
//     // More people...
//   ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  return (
    <div className="px-4 ">
      <div className="mt-2 flow-root">
        <div className="overflow-y-auto overflow-x-auto rounded-3xl bg-white">
          <div className="inline-block min-w-full max-h-[600px] py-2 align-middle bg-white rounded-3xl">
            <table className="min-w-full max-h-[600px]">
              <thead className="">
                <tr className='rounded-3xl overflow-x-scroll'>
                {tableHeadings.map((item, index) => {
                return (
                  <th key={index} scope="col" 
                  className='sticky top-0 z-10 whitespace-nowrap border-b first:rounded-tr-3xl last:rounded-tl-3xl border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8'>
                  {/* // className="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-3"> */}
                    {item.arabic_name}
                  </th>);})}
                </tr>
              </thead>
              <tbody className="max-h-[200px]  overflow-y-auto">
                {tableData.map((data) => (
                  <Fragment  key={data.name}>
                    <tr className="border border-gray-200">
                      <th
                        colSpan={5}
                        scope="colgroup"
                        className="bg-primaryColor/5 py-2 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-3"
                      >
                        {data.name.arabic_sector}
                      </th>
                    </tr>
                    {data.data.map((item, index) => (
                      <tr
                        key={item.name}
                        className={classNames(index === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                      >
                        <td className="max-w-32 overflow-x-auto whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                          {item.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-gray-500">{Number(item.trade_price).toLocaleString('en-US')}</td>
                        <td className={` whitespace-nowrap px-3 py-4 text-sm font-semibold ${item.change > 0 ? "text-lightGreenColor" : "text-lightRedColor"}`}>
                          <div className='flex gap-2 items-center'>
                        {item.change > 0 ?(
                            <TiArrowSortedUp className="text-primaryColor" />
                          ) : (
                            <TiArrowSortedDown className="text-redColor" />
                          )}
                          {item.change} 
                          </div>
                          </td>
                        {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.role}</td> */}
                        <td className={`flex gap-2 items-center relative whitespace-nowrap py-4 pl-3 font-semibold pr-4 ${item.change > 0 ? "text-lightGreenColor" : "text-lightRedColor"} text-right text-sm sm:pr-3`}>
                        {item.change > 0 ?(
                            <TiArrowSortedUp className="text-primaryColor" />
                          ) : (
                            <TiArrowSortedDown className="text-redColor" />
                          )} % {item.pct_change}  
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupedRowsTable
