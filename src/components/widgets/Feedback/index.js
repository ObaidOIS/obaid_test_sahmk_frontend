import React from 'react'

const Feedback = ({icon, title, onClick}) => {
  return (
    <div className='mx-auto'>
        <button
        onClick={onClick}
      type="button"
      className="relative block w-full rounded-lg  border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-offset-2"
    >
      <div className='mx-auto w-full flex justify-center'>{icon}</div>
      <span className="mt-2 block text-sm font-semibold text-gray-900">{title}</span>
    </button>
    </div>
  )
}

export default Feedback
