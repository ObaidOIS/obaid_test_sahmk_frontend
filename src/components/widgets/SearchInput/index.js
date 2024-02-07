import React from 'react'

const SearchInput = ({searchQuery, handleSearch, placeholder, inputStyle, icon, inputContainerStyle, onFocus, onClick, onBlur}) => {
  return (
    <div>
      <div>
      <div className={`mt-2 ${inputContainerStyle}`}>
      {/* {icon && ( */}
        <div className="absolute inset-y-0 left-0 flex z-30 items-center pl-3">
          {icon}
        </div>
      {/* )} */}
        <input
          type="text"
          defaultValue=""
          onFocus={onFocus} onClick={onClick} onBlur={onBlur}
          value={searchQuery}
          autoComplete="off"
          onChange={(e) => handleSearch(e.target.value)}
          className={`block w-full appearance-none bg-bgColor rounded-md border-0 py-2.5 px-4 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:leading-6 ${inputStyle} `}
          placeholder={placeholder}
        />
      </div>
    </div>
    </div>
  )
}

export default SearchInput
