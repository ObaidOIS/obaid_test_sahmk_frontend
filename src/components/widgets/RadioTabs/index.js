"use client";
import React, { useState } from 'react'

const RadioTabs = ({radioTabOptions}) => {

    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (index) => {
      setSelectedTab(index);
    };
    
  return (
    <main className="grid place-items-center">
    <div className="grid grid-cols-2 gap-2 rounded-full border border-gray-400 bg-white px-3 py-1.5">
      {radioTabOptions.map((item, index) => (
        <div key={index}>
          <input
            type="radio"
            name="option"
            id={`tab-${index}`}
            value={item.tab}
            className="peer hidden"
            checked={selectedTab === index}
            onChange={() => handleTabChange(index)}
          />
          <label
            htmlFor={`tab-${index}`}
            className={`block cursor-pointer text-lg select-none rounded-full px-2 py-1 text-center ${
              selectedTab === index
                ? 'bg-teal-500 px-7 hover:shadow-xl text-white'
                : ''
            }`}
          >
            {item.tab}
          </label>
        </div>
      ))}
    </div>
  </main>
  )
}

export default RadioTabs
