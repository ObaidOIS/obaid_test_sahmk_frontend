import Image from 'next/image'
import React from 'react'

const StatsBoxUI = ({ stat }) => {

  return (
    <div>
  <dl className="grid grid-cols-1 gap-5">
      <div key={stat.name} className={`flex items-start overflow-hidden rounded-2xl border border-mediumGreyColor px-4 py-5 sm:p-6 ${stat.name == "نسبة التغير اليومي" ? stat.value >= 0 ? "bg-primaryColor/5 " : "bg-redColor/10" : "bg-whiteColor"}`}>
        <div className="flex-1 ml-2 overflow-x-auto">
          <dd className={`text-xl font-medium tracking-tight ${stat.name == "نسبة التغير اليومي" ? stat.value >= 0 ? "text-primaryColor " : "text-redColor" : "text-darkColor"}`}>
            {stat.value == "-" ? stat.value : isNaN(stat.value) ? stat.value : Number(stat.value).toLocaleString()}
          </dd>
          <dt className="whitespace-nowrap text-sm font-medium text-gray-500">{stat.name}</dt>
        </div>
        <div>
          {stat.name == "أدنى سعر" && (
            <Image
              loading="eager"
              src="/assets/icons/red-arrow-up-rectangle.svg"
              width={24}
              height={24}
              alt="Image"
              priority
            />
          )}
          {stat.name == "أعلى سعر" && (
            <Image
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
