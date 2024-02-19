"use client";
import React, { useState } from 'react'

const UnderlineTabsUI = () => {
    const [selectedTab, setSelectedTab] = useState('Team Members');
  
    const handleTabChange = (tab) => {
      setSelectedTab(tab);
    };
  return (
    <div>
    <div className="sm:hidden">
      <label htmlFor="tabs" className="sr-only">
        Select a tab
      </label>
      <select
        id="tabs"
        name="tabs"
        value={selectedTab}
        onChange={(e) => handleTabChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        <option value="My Account">My Account</option>
        <option value="Company">Company</option>
        <option value="Team Members">Team Members</option>
        <option value="Billing">Billing</option>
      </select>
    </div>
    <div className="hidden sm:block">
      <div className="border-b border-gray-200">
        <nav
          className="-mb-px flex space-x-8"
          aria-label="Tabs"
        >
          {['My Account', 'Company', 'Team Members', 'Billing'].map((tab) => (
            <a
              key={tab}
              href="#"
              onClick={() => handleTabChange(tab)}
              className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                selectedTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {tab}
            </a>
          ))}
        </nav>
      </div>
    </div>
  </div>
  )
}

export default UnderlineTabsUI
