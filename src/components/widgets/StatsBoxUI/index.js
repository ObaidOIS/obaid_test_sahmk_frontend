import Image from 'next/image'
import React from 'react'

const StatsBoxUI = ({ stat }) => {

        const checkNumber = () => {
          if (number >= 0) {
            console.log("The number is positive.");
          }else {
            console.log("The number is negative.");
          }
        };

  return (
    <div>
      <dl className="grid grid-cols-1 gap-5">
        {/* {stats.map((stat) => ( */}
          <div key={stat.name} className={`overflow-hidden rounded-lg px-4 py-5 shadow sm:p-6 ${stat.name == "نسبة التغير اليومي" ? "bg-primaryColor/5 " : "bg-whiteColor"}`}>
            <div>
                {stat.name == "أدنى سعر" &&
                <Image loading="eager"  
                src="/assets/icons/red-arrow-up-rectangle.svg"
                width={24}
                height={24}
                alt="Image"
                priority
              />}
              {stat.name == "أعلى سعر" &&
                <Image loading="eager"  
                src="/assets/icons/green-arrow-up-rectangle.svg"
                width={24}
                height={24}
                alt="Image"
                priority
              />}
            </div>
            <dd className={`mt-1 text-3xl font-semibold tracking-tight ${stat.name == "نسبة التغير اليومي" ? "text-primaryColor " : "text-darkColor"}`}>{stat.value == "-" ? stat.value : isNaN(stat.value) ? stat.value : Number(stat.value).toLocaleString()}</dd>
            <dt className="truncate text-sm font-medium text-gray-500">{stat.name}</dt>
          </div>
        {/* ))} */}
      </dl>
    </div>
  )
}

export default StatsBoxUI
