import Image from 'next/image'
import React from 'react'

const ArrowList = () => {
  return (
    <div className="max-w-2xl mx-auto">
	<div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
   <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                    <Image  src="/assets/icons/24hours.svg" width={45} height={45} alt="img" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Neil Sims
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <Image  src="/assets/icons/24hours.svg" width={45} height={45} alt="img" />
                    </div>
                </div>
            </li>
        </ul>
   </div>
</div>
</div>
  )
}

export default ArrowList
