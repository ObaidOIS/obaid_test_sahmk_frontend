import React from "react";

const UserProfileStats = ({ stats, activeTab }) => {
  return (
    <div className="bg-white pt-8 pb-12 shadow-lg mb-5 rounded-3xl">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-lg font-medium mb-5">{activeTab}</div>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
          {stats && stats.map((stat) => (
            <div key={stat.name} className=" flex flex-col">
              <dt className="text-sm leading-7 text-gray-500/90 font-medium truncate">
                {stat.name}
              </dt>
              <dd className={`tracking-tight text-gray-900 font-medium ${stat.name == "نسبة التغيير" ? "text-primaryColor" : ""}`}>
                {stat.value == "-" ? stat.value : isNaN(stat.value) ? stat.value : Number(stat.value).toLocaleString()}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default UserProfileStats;