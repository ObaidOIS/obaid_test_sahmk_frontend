import React from 'react'

const InputFieldUI = ({label, placeholder, name, value, id, paramOne, paramTwo, onkeyup, onKeyUpEvent, required, handleChange, maxlength, buttonStyle, inputmode, isValid}) => {
  return (
    <div>
    {label ? <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">{label}</label> : "" }
    <div className="mt-2">
      <input inputMode={inputmode} value={value} onKeyUp={(e) => {onKeyUpEvent == true && onkeyup(e, paramOne, paramTwo)}} id={id} onChange={handleChange} maxLength={maxlength} type="text" name={name} className={`block appearance-none w-full px-4 rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 focus:ring-2 ${isValid ? 'focus:ring-primaryColor' : 'focus:ring-redColor'} sm:text-sm sm:leading-6 ${buttonStyle}`} required={required} placeholder={placeholder} />
    </div>
  </div>
  )
}

export default InputFieldUI
