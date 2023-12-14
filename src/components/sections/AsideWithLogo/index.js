import React from 'react'
import Image from 'next/image';

const AsideWithLogo = () => {
  return (
      <div className='relative flex-1'>
        <Image src="/assets/images/dark-rectangle.png" layout='fill' objectFit='cover' alt='image' />
        <div className='absolute top-52 left-5 w-80 px-5'>
            <div className='grid grid-cols-1'>
                <div className='ms-auto text-center'>
                    <Image src="/assets/logos/logo-accent.png" height={180} width={180} alt='image' />
                    <div className='w-60 mt-20'>
                        <p className="text-white text-xl font-semibold w-full">وصولك لأسعار الأسهم أصبح أسرع مع سهمك</p>
                        <h5 className="text-gray-400/70">مرخص من تداول </h5>
                    </div>
                    <div className='flex justify-end mt-44'>
                        <Image src="/assets/icons/logout.svg" height={30} width={30} alt='image' />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AsideWithLogo
