import React from 'react'

const RadioButtonGroup = ({buttonTabs, selectedMemory, handleMemoryChange}) => {
  return (
    <div>
      <fieldset className="mt-2">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {buttonTabs.map((tab, index) => (
            <label
              key={index}
              className={`flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1 cursor-pointer focus:outline-none ${
                selectedMemory === tab.button
                  ? "ring-2 ring-primaryColor ring-offset-2 bg-primaryColor text-white hover:bg-primaryColor"
                  : "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name="memory-option"
                value={tab.button}
                checked={selectedMemory === tab.button}
                onChange={handleMemoryChange}
                className="sr-only"
                aria-labelledby={`memory-option-${index}-label`}
              />
              <span id={`memory-option-${index}-label`} className=' whitespace-nowrap'>{tab.button}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  )
}

export default RadioButtonGroup
