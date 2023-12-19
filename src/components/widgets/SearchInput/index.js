import React from 'react'

const SearchInput = () => {
  return (
    <div>
      <div>
      <div className="mt-2">
        <input
          type="search"
          name="search"
          id="search"
          className="block w-full bg-bgColor rounded-md border-0 py-3.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accentColor sm:text-sm sm:leading-6"
          placeholder="بحث باسم الشركة"
        />
      </div>
    </div>
    </div>
  )
}

export default SearchInput
