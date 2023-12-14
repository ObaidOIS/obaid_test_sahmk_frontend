"use client";
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import PrimaryButton from '@/components/widgets/PrimaryButton';

const Sidebar = ({isSidebarOpen, toggleSidebar}) => {

    const navLinks = [
        { name: "الرئيسية" },
        { name: "الخدمات" },
        { name: "اشتراكاتنا" },
        { name: "من نحن" },
        { name: "تواصل معنا" },
      ];
    
      const [activeTab, setActiveTab] = useState(0);
    
      const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
      };

  return (
    <div className={` ${isSidebarOpen ? "" : ""} z-[2147483647] flex lg:hidden`}>
    <div className=" z-40">
        <nav id="sidebar"
            className={`fixed ${isSidebarOpen ? "left-64 top-0" : "left-0 top-0"} transition-all duration-300 ease-in-out h-full z-[2147483647] flex w-3/4 -translate-x-full flex-col overflow-y-auto bg-gray-50 pt-6 pb-8 sm:max-w-xs lg:w-80`}>
            <div className="px-4 pb-6">
                <IoMdClose size={24} onClick={toggleSidebar} />
                <ul className="my-6 text-sm font-semibold">
                {navLinks.map((item, index) => {
                return (
                    <li key={index} onClick={() => {handleTabClick(index)}} className={``}>
                        <a className={` ${activeTab == index ? "text-teal-500" : ""} active flex items-center rounded py-3 pl-3 pr-4 hover:bg-gray-200`}
                            href="#">
                            <span className="select-none">{item.name}</span>
                        </a>
                    </li>);
                    })}
                    <li>
                    <div className="items-center h-full mt-6 flex">
                    <a href="#_" className="font-semibold hover:text-gray-900">
                        {" "}
                        تسجل الدخول{" "}
                    </a>
                    <div className="mr-4 inline">
                        <PrimaryButton button="سجل معنا"  />
                    </div>
                </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    <div className="mx-auto lg:ml-80"></div>
</div>
  )
}

export default Sidebar
