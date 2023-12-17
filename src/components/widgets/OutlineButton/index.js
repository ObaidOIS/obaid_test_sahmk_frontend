import React from 'react'

const OutlineButton = ({button, icon, buttonStyle}) => {
  return (
    <button className={`text-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-150 border border-gray-300 text-teal-800 rounded-full outline-none py-2 px-6 inline-flex items-center ${buttonStyle} `}>
        <span>{button}</span>
        {icon}
    </button>
  )
}

export default OutlineButton
