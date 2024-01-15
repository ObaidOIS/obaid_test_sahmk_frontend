import React from 'react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import {pricing} from "@/components/common/pricing";  

const RadioCardGroup = ({dataList, selectedOption, handleOptionChange, frequency}) => {
    
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
        {dataList.map((link) => (
          <label
            key={link.title}
            className={`relative flex cursor-pointer rounded-lg border bg-white p-3 shadow-sm focus:outline-none ${
              selectedOption === link.title ? 'border-primaryColor ring-2 ring-primaryColor' : 'border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="subscription-plan"
              value={link.title}
              className="sr-only"
              checked={selectedOption === link.title}
              onChange={() => handleOptionChange(link.title, link, frequency.value)}
            />
            <span className="flex flex-1 items-start gap-4">
            {link.icon}
              <span className="flex flex-col">
                <span className="block text-sm font-medium text-gray-900">{link.title}</span>
                <span className="mt-1 flex items-center text-sm text-gray-500">{link.desc}</span>
                <span className="mt-6 text-sm font-medium text-gray-900">
                  {/* {link.price[frequency.value]} */}
                  {link.card == "free" ? pricing.pricing.free[frequency.value] : link.card == "premium" ? pricing.pricing.premium[frequency?.value] : link.card == "advance" ? pricing.pricing.companies[frequency?.value] : "" }
                  </span>
              </span>
            </span>
            <CheckCircleIcon
                  className={classNames((selectedOption !== link.title) ? 'invisible' : '', 'h-5 w-5 border-2 rounded-full border-primaryColor text-primaryColor')}
                  aria-hidden="true"
                />
            <span className={`pointer-events-none absolute -inset-px rounded-lg ${selectedOption === link.title ? 'border-2 border-primaryColor' : 'border-transparent'}`} aria-hidden="true"></span>
          </label>
        ))}
    </>
  )
}

export default RadioCardGroup
