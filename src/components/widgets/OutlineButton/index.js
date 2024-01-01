import React from 'react'

const OutlineButton = ({button, icon, buttonStyle}) => {
  return (
    <button className={`hover:bg-gray-100 inline-flex whitespace-nowrap hover:shadow-xl transition-all duration-150 border border-gray-300 text-teal-800 rounded-full outline-none py-2 px-6 items-center ${buttonStyle} `}>
        <span>{button}</span>
        <span>{icon}</span>
    </button>
  )
}

export default OutlineButton
