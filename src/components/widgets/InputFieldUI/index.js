import React from 'react'

const InputFieldUI = ({label, placeholder, name, value, id, paramOne, paramTwo, onKeyUp, handleChange, maxlength, buttonStyle}) => {
  return (
    <div>
    {label ? <label for="text" className="block text-sm font-medium leading-6 text-gray-900">{label}</label> : "" }
    <div className="mt-2">
      {/* <input onKeyUp={(e) => onKeyUp(e, paramOne, paramTwo)} id={id} onChange={handleChange} maxlength={maxlength} type="text" name={name} className={`block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primaryColor sm:text-sm sm:leading-6 ${buttonStyle}`} placeholder={placeholder} /> */}
      <input id={id} onChange={handleChange} onKeyUp={(e) => onKeyUp(e, paramOne, paramTwo)} maxlength={maxlength} type="text" name={name} className={`block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primaryColor sm:text-sm sm:leading-6 ${buttonStyle}`} placeholder={placeholder} />
    </div>
  </div>
  )
}

export default InputFieldUI
