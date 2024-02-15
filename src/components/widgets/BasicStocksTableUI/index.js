import React from 'react'

const BasicStocksTableUI = ({tableTitles, tableData}) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 rounded-3xl">
      <div className="mt-2 flow-root rounded-3xl">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 rounded-3xl">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {tableTitles.map((item, index) => {
                    return (
                      <th
                        scope="col"
                        key={index}
                        className="py-3.5 pl-4 pr-4 whitespace-nowrap text-right text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                      >
                        {item.title}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {tableData.map((item, index) => (
                  <tr key={index} className={index === 0 ? "bg-brightRedColor" : index === 2 ? "bg-brightGreenColor" : ""}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 lg:pl-8">
                      {item.symbol}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      {item.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      {item.price || "-"}
                    </td>
                    <td className={`${index === 2 ? "text-lightGreenColor" :"text-lightRedColor" } whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 lg:pl-8`}>
                      {item.change}
                    </td>
                    <td className={`${index === 2 ? "text-lightGreenColor" :"text-lightRedColor" } whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 lg:pl-8`}>
                      {item.change_percentage}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      {item.stock_size}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicStocksTableUI
