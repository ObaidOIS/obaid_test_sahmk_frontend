"use client";
import React, { useState } from "react";

const UnderlineTabsUI = ({tabs, activeTab, handleTabChange}) => {

  return (
    <div>
      <div className="block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex justify-between" aria-label="Tabs">
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => {handleTabChange(tab.value); }}
                className={`whitespace-nowrap border-b-2 cursor-pointer py-4 w-1/4 px-1 text-center text-sm font-medium ${
                  activeTab === tab.value
                    ? "border-mediumGreenColor text-mediumGreenColor"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {tab.name}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default UnderlineTabsUI;
