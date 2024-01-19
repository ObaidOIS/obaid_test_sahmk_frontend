import React from 'react';

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function OutlinePillTabsUI({tab, active, index}) {
    return (
      <div>
        <div className="block">
          <nav className="flex space-x-4" aria-label="Tabs">
              <div
                key={tab}
                className={classNames(
                  active == index ? 'bg-secondaryColor text-white' : ' text-secondaryColor border border-primaryColor/40 hover:text-gray-700',
                  index == 0 ? "" : "", 
                  'rounded-md px-3 py-2 text-sm cursor-pointer font-medium truncate'
                )}
                aria-current={active == index ? 'page' : undefined}
              >
                {tab}
              </div>
          </nav>
        </div>
      </div>
    )
}
