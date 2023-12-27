import React from 'react'

const TextIconButton = (button, buttonStyle, icon) => {
  return (
    <button
        type="button"
        className={`inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${buttonStyle} `}
      >
        {button}
        {icon}
      </button>
  )
}

export default TextIconButton
