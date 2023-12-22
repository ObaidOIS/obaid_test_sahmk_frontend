import React from 'react'

const IconButtonUI = ({button, buttonStyle, icon}) => {
  return (
    <>
      
      <button
        type="button"
        className={`inline-flex items-center gap-x-1.5 rounded-md bg-primaryColor px-3 py-2 text-sm font-semibold shadow-sm hover:text-primaryColor/90 hover:shadow hover:border-primaryColor border border-transparent  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColor ${buttonStyle}`}
      >
        {icon}
        {button}
      </button>
    </>
  )
}

export default IconButtonUI
