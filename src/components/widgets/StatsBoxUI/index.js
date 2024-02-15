import Image from 'next/image'
import React from 'react'

const StatsBoxUI = ({ stat }) => {

  return (
    <div>
  <dl className="grid grid-cols-1 gap-5">
      <div key={stat.name} className={`flex items-start overflow-hidden rounded-2xl px-4 py-5 sm:p-6 ${stat.name == "نسبة التغير اليومي" ? stat.value >= 0 ? "bg-brightGreenColor " : "bg-brightRedColor" : "border border-brightGreyColor bg-whiteColor"}`}>
        <div className="flex-1 ml-2 overflow-x-hidden overflow-y-hidden">
          <dd className={`text-xl font-medium tracking-tight ${stat.name == "نسبة التغير اليومي" ? stat.value >= 0 ? "text-lightGreenColor " : "text-lightRedColor" : "text-darkColor"}`}>
            {stat.value == "-" ? stat.value : isNaN(stat.value) ? stat.value : Number(stat.value).toLocaleString('en-US')}
          </dd>
          <dt className="whitespace-nowrap truncate text-sm font-medium text-gray-500">{stat.name}</dt>
        </div>
        <div>
          {stat.name == "أدنى سعر" && (
            <Image unoptimized={true} 
              loading="eager"
              src="/assets/icons/red-arrow-up-rectangle.svg"
              width={24}
              height={24}
              alt="Image"
              priority
            />
          )}
          {stat.name == "أعلى سعر" && (
            <Image unoptimized={true} 
              loading="eager"
              src="/assets/icons/green-arrow-up-rectangle.svg"
              width={24}
              height={24}
              alt="Image"
              priority
            />
          )}
        </div>
      </div>
  </dl>
</div>

  )
}

export default StatsBoxUI
