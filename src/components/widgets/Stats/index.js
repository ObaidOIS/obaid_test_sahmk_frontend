import React from "react";

const Stats = ({ stats }) => {
  return (
    <div className="bg-white py-8 shadow-lg rounded-xl">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
          {stats && stats.map((stat) => (
            <div key={stat.name} className=" flex flex-col">
              <dt className="text-base leading-7 text-gray-500/90 font-medium truncate">
                {stat.name}
              </dt>
              <dd className="tracking-tight text-gray-900 font-medium ">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Stats;
