import React from 'react'

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function TabsBarUI({tab, index, active, tabs}) {
    return (
      <div>
        <div className="block">
          <nav className="isolate flex divide-x divide-gray-200" aria-label="Tabs">
              <div
                key={tab}
                className={classNames(
                  active == tab ? 'text-whiteColor bg-secondaryColor rounded-full' : 'text-gray-500 hover:text-gray-700 rounded-full',
                  index == 0 ? "ml-3" : "", 
                  'group relative min-w-0 flex-1 cursor-pointer overflow-hidden truncate py-2 px-2 text-center text-sm font-medium focus:z-10'
                )}
                aria-current={active == tab ? 'page' : undefined}
              >
                <span>{tab}</span>
                {/* <span
                  aria-hidden="true"
                  className={classNames(
                    active == tab ? 'bg-indigo-500' : 'bg-transparent',
                    'absolute inset-x-0 bottom-0 h-0.5'
                  )}
                /> */}
              </div>
          </nav>
        </div>
      </div>
    )
  }
