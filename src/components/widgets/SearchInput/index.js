import React from 'react'

const SearchInput = ({searchQuery, handleSearch}) => {
  return (
    <div>
      <div>
      <div className="mt-2">
        <input
          type="text"
          defaultValue=""
          value={searchQuery}
          autoComplete="off"
          onChange={(e) => handleSearch(e.target.value)}
          className="block w-full appearance-none bg-bgColor rounded-md border-0 py-1.5 px-4 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6"
          placeholder="بحث باسم الشركة"
        />
      </div>
    </div>
    </div>
  )
}

export default SearchInput
