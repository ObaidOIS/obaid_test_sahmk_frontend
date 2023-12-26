import React from 'react'

const TextAreaUI = ({label, name}) => {
  return (
    <div>
       <label htmlFor={name} className="block text-sm font-semibold leading-6 text-gray-900">
                {label}
              </label>
              <div className="mt-2.5">
                <textarea
                  name={name}
                  id={name}
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset outline-none ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
    </div>
  )
}

export default TextAreaUI
