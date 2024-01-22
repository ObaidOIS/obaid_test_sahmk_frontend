import React from 'react';

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function PillTabsUI({tab, active, index, currentTab}) {
    return (
      <div> 
        <div className="block">
          <nav className="flex space-x-4" aria-label="Tabs">
              <div
                key={tab}
                className={classNames(
                  active == currentTab ? 'bg-secondaryColor text-white' : 'bg-gray-200 text-secondaryColor bg-primaryColor/5 hover:text-gray-700',
                  index == 0 ? "ml-3" : "", 
                  'rounded-md px-3 py-2 text-sm cursor-pointer font-medium truncate'
                )}
                aria-current={active == currentTab ? 'page' : undefined}
              >
                {tab}
              </div>
          </nav>
        </div>
      </div>
    )
  }
