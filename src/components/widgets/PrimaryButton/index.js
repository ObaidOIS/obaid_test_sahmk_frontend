import React from 'react'
import Link from 'next/link';

const PrimaryButton = ({button, icon, buttonStyle, onClick, type}) => {
  return (
    <button type={type} onClick={onClick} className={` hover:bg-primaryColor hover:shadow-xl transition-all duration-150 bg-secondaryColor text-white rounded-full outline-none py-2 px-6 inline-flex items-center ${buttonStyle} `}>
        <span>{button}</span>
        <span>{icon}</span>
    </button>
  )
}

export default PrimaryButton
