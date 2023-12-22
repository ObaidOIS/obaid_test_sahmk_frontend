import React from 'react'

const InputFieldUI = ({label, placeholder, name, value, handleChange}) => {
  return (
    <div>
    {label ? <label for="text" className="block text-sm font-medium leading-6 text-gray-900">{label}</label> : "" }
    <div className="mt-2">
      <input onChange={handleChange} type="text" name={name} id="text" className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primaryColor sm:text-sm sm:leading-6" placeholder={placeholder} />
    </div>
  </div>
  )
}

export default InputFieldUI
