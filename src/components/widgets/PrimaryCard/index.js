"use client";
import React from 'react'

const PrimaryCard = ({title, desc, icon}) => {
  return (
    <>
        <h3>
            <button className='font-bold flex text-white'>
                <span>{icon}</span>
                <span className='rounded-full rounded-l-xl rounded-r-none'>{title}</span>
            </button>
        </h3>
        <p className='mt-2 text-sm text-gray-400 leading-8'>{desc}</p>
    </>
  )
}

export default PrimaryCard
