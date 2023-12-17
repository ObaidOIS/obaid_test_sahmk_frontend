import LinkText from '@/components/widgets/LinkText'
import Image from 'next/image'
import React from 'react'

const TryMeSection = () => {

  const data = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div id='try-us' className="flex items-end w-full mb-32 min-h-screen bg-white">
        <div className="w-full text-gray-700 mx-6 body-font">
        <div
            className="container flex flex-col flex-wrap py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
            <div className="flex-shrink-0 w-full lg:w-1/3 px-1 mx-auto md:mx-0">
            <div className="mb-3 mt-10 flex w-4/5">
                <div className="">
                    <div className="text-xl text-teal-500 font-extrabold mb-5 leading-none">
                    جرب أسأل النظام
                    </div>
                    <div className="text-3xl font-semibold mb-5 leading-none">
                    وصول لأسعار الأسهم ومعلومات السوق
                    </div>
                    <p className=" font-semibold text-gray-400 leading-7 lg:pl-20">جرب بإمكانك تجربة منصة سهمك من خلال سؤال عن الأسئلة في سوق الاسهم  النظام</p>
                </div>
            </div>
            </div>
            <div className="flex flex-wrap flex-grow justify-end mt-10 -mb-10 md:pl-20 md:mt-0 ">
                <div className="w-full px-4 sm:w-1/2">
                    <nav className="mb-10 list-none">
                    {data.map((index) => (
                        <li className="my-10 cursor-pointer group" key={index}>
                            <LinkText />
                        </li>
                        ))}
                    </nav>
                </div>
                <div className="w-full px-4 sm:w-1/2">
                    <nav className="mb-10 list-none">
                    {data.map((index) => (
                        <li className="my-10 cursor-pointer group" key={index}>
                            <LinkText />
                        </li>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
        <div className="w-full text-center">
            <div className="bg-gray-100 px-5 cursor-pointer py-3 mx-auto inline-flex border border-gray-400 rounded-full">
                <span className="text-sm text-gray-600 font-semibold capitalize xl:text-center flex">  جرب النظام الذكي على الواتساب  
                <span className='text-teal-500 flex mr-2  font-bold'> عيش التجربة  
                <Image src="/assets/icons/green-right-arrow.svg" width={16} height={16} className="mr-5" alt="img" /> </span></span>
            </div>
        </div>
    </div>

</div>
  )
}

export default TryMeSection
