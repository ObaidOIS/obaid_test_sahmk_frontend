import Image from 'next/image'
import React from 'react'

const ArrowList = ({title, desc, icon, bgColor}) => {
  return (
    <div className="group mx-auto cursor-pointer">
	<div className="p-2 bg-white border-y hover:border-gray-400 hover:bg-gray-100">
        <ul role="list" className="">
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 ml-4">
                    <div className={` w-14 h-14 rounded-xl flex justify-center items-center ${bgColor}`}>
                            {icon}
                        </div>
                    {/* <Image  src="/assets/icons/24hours.svg" width={60} height={60} alt="img" /> */}
                    </div>
                    <div className="flex-1 min-w-0 leading-8 align-middle">
                        <p className="text-lg text-gray-900 font-medium truncate">
                        {title}
                        </p>
                        <p className="text-gray-400 font-medium truncate">
                        {desc}
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        <Image  src="/assets/icons/arrow-right.svg" width={8} height={8} alt="img" className='group-hover:opacity-100 opacity-20' />
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
  )
}

export default ArrowList
