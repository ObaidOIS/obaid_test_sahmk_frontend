import React from 'react'

const AvatarWithText = ({image, title, desc, descStyle }) => {
  return (
    <div>
       <div href="#" className="group block flex-shrink-0">
      <div className="flex items-center">
        <div>
          {image}
        </div>
        <div className="mr-3 space-y-1">
          <p className=" font-medium text-gray-700 group-hover:text-gray-900">{title}</p>
          <p className={`text-xs font-medium text-gray-500 group-hover:text-gray-700 ${descStyle} `}>{desc}</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AvatarWithText
