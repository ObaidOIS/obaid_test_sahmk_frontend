import React from 'react'

const SimpleCardHeader = ({title, content}) => {
  return (
    <div>
    <div className="border-b border-gray-200 bg-white px-4 py-4 rounded-t-2xl sm:px-6">
      <h3 className="text-base font-semibold leading-6 text-gray-900">{title}</h3>
    </div>
    <div className='mx-4 sm:mx-6 mt-4 mb-6'>
        {content}
    </div>
    </div>
  )
}

export default SimpleCardHeader
