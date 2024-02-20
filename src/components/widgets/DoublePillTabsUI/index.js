import React from 'react';

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function DoublePillTabsUI({tab, activeOne, activeTwo, index, currentTabOne, currentTabTwo, tabStyle}) {
    return (
      <div> 
        <div className="block">
          <nav className="flex space-x-4" aria-label="Tabs">
              <div
                key={tab}
                className={classNames(
                  (activeOne == currentTabOne || activeTwo == currentTabTwo) ? 'bg-secondaryColor text-white' : 'bg-gray-200 text-secondaryColor bg-primaryColor/5 hover:text-gray-700',
                  index == 0 ? "ml-3" : "", 
                  `rounded-md px-3 py-2 text-sm cursor-pointer font-medium truncate ${tabStyle}`
                )}
                aria-current={(activeOne == currentTabOne || activeTwo == currentTabTwo) ? 'page' : undefined}
              >
                {tab == "TASI" ? "تاسي" : tab == "NOMUC" ? "سوق نمو" : tab} 
              </div>
          </nav>
        </div>
      </div>
    )
  }
