import React from 'react';
import Image from 'next/image';

const LinkText = () => {
  return (
    <div>
        <div className="text-xl font-medium group-hover:underline mb-5 leading-none">
        عطني معلومات سهم الراجحي؟
        </div>
        <div className="text-xl group-hover:underline flex items-center text-accentColor font-medium mb-5 leading-none">
        <span>جرب الآن</span>
        <span>
        <Image src="/assets/icons/green-right-arrow.svg" width={16} height={16} className="mr-5" alt="img" />
        </span>
        </div>
    </div>
  )
}

export default LinkText
