import React from 'react'

const InputFieldUI = ({label, placeholder, name, value, onChange}) => {
  return (
    <div>
    {label ? <label for="text" class="block text-sm font-medium leading-6 text-gray-900">{label}</label> : "" }
    <div class="mt-2">
      <input type="text" name="text" id="text" class="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primaryColor sm:text-sm sm:leading-6" placeholder={placeholder} />
    </div>
  </div>
  )
}

export default InputFieldUI
