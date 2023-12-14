import React from 'react'

const BasicCard = ({title, desc, icon}) => {
  return (
    <div className="p-6 space-y-4 mb-4 cursor-pointer hover:border hover:border-gray-300 border border-white hover:bg-gray-50 rounded-2xl ">
      {icon}
        <p className="font-bold text-lg">{title}</p>
        <h5 className={`text-gray-600 tracking-tight font-semibold`}>{desc}</h5>
    </div>
  )
}

export default BasicCard
