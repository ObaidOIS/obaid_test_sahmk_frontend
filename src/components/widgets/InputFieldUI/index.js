import React from 'react'

const InputFieldUI = ({label, placeholder, name, value, id, handleKeyUp, required, handleChange, maxlength, buttonStyle, inputmode, isValid, dir, handlePaste, autocomplete, disabled, onInput}) => {
  return (
    <div>
    {label ? <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">{label}</label> : "" }
    <div className="mt-2">
      <input onInput={onInput} inputMode={inputmode} value={value} 
      onKeyUp={handleKeyUp} dir={dir}
      autocomplete={autocomplete}
      disabled={disabled}
      id={id} onChange={handleChange} onPaste={handlePaste} maxLength={maxlength} type="text" name={name} className={`block appearance-none w-full px-4 rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 focus:ring-2 ${isValid ? "required:ring-red-500 focus:ring-primaryColor" : 'focus:ring-primaryColor'}  sm:text-sm sm:leading-6 ${buttonStyle}`} required={required} placeholder={placeholder} />
    </div>
  </div>
  )
}

export default InputFieldUI
