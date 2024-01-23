import React from 'react';
import Image from 'next/image';

const LinkText = ({message, link}) => {
  return (
    <div>
        <div className="text-xl font-medium group-hover:underline mb-5 leading-none">
        {message}
        </div>
        <div className="text-xl group-hover:underline flex items-center text-primaryColor font-medium mb-5 leading-none">
        <span>{link}</span>
        <span>
        <Image src="/assets/icons/green-right-arrow.svg" width={16} height={16} className="mr-5" alt="img" priority />
        </span>
        </div>
    </div>
  )
}

export default LinkText
