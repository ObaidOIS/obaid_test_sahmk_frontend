import React from 'react'

const OutlineButton = ({button, icon, buttonStyle}) => {
  return (
    <button className={` font-semibold hover:bg-gray-100 hover:shadow-xl transition-all duration-150 border border-teal-900 text-teal-900 rounded-full outline-none py-2 px-6 inline-flex items-center ${buttonStyle} `}>
        <span>{button}</span>
        {icon}
    </button>
  )
}

export default OutlineButton
