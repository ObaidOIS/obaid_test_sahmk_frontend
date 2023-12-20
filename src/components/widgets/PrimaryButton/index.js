import React from 'react'
import Link from 'next/link';

const PrimaryButton = ({button, icon, buttonStyle}) => {
  return (
    <button className={`hover:bg-teal-700 hover:shadow-xl transition-all duration-150 bg-teal-900 text-white rounded-full outline-none py-2 px-6 inline-flex items-center ${buttonStyle} `}>
        <span>{button}</span>
        <span>{icon}</span>
    </button>
  )
}

export default PrimaryButton
