"use client";
import React, {useState} from "react";

const BasicTableUI = ({
  tableTitles,
  tableData,
  setIsSecondFeatureModalOpen,
  setFormData,
  confirmDelete,
  setWarningAlert,
  setWarningMessage,
  setCompanyToBeDeteled,
}) => {
  

  const onClickDelete = (item) => {
    setCompanyToBeDeteled(item);
    setWarningMessage("هل أنت متأكد أنك تريد حذف مخزون المستخدم هذا؟");
    setWarningAlert(true);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                      {item.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.stock_price}
                    </td>
                    <td className="text-blueColor whitespace-nowrap px-3 py-4 text-sm">
                      {item.target_price || "-"}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                      <div className="flex gap-4">
                      <div
                        onClick={() => {
                          // setFormData(item);
                          // confirmDelete(item); 
                          onClickDelete(item);
                        }}
                        className="text-redColor/80 cursor-pointer hover:text-redColor"
                      >
                        حذف<span className="sr-only">, {item.name}</span>
                      </div>
                      <div
                        onClick={() => {
                          setIsSecondFeatureModalOpen(true);
                          setFormData(item);
                        }}
                        className="text-indigo-600 cursor-pointer hover:text-indigo-900"
                      >
                        تعديل<span className="sr-only">, {item.name}</span>
                      </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicTableUI;
