import React from "react";
import { CgClose } from "react-icons/cg";
import ArrowList from "@/components/widgets/ArrowList";
import Image from "next/image";

const MainSidebar = ({ isSidebarOpen, toggleSidebar, list }) => {
  return (
    <div
      className={`fixed inset-0 lg:relative lg:flex lg:justify-end ${
        isSidebarOpen ? " overflow-hidden" : ""
      } z-[2147483647] lg:hidden relative`}
    >
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-900 opacity-70 z-40"></div>
      )}
      <div className="z-50 lg:w-80 lg:flex-shrink-0">
        {isSidebarOpen && (
          <Image
            src="/assets/icons/close-icon.svg"
            width={35}
            height={35}
            onClick={toggleSidebar}
            className="fixed z-[2147483647] right-[330px] sm:right-[400px] top-8"
            alt="img"
          />
        )}
        <nav
          id="sidebar"
          className={`fixed ${
            isSidebarOpen ? "right-0 top-0" : "translate-x-full"
          } transition-all duration-300 ease-in-out w-80 sm:w-auto h-full z-[2147483647] lg:relative flex flex-col overflow-y-auto bg-white pt-6 pb-8`}
        >
          <div className="px-4 pb-6 mt-4">
            <Image
              src="/assets/logos/logo-icon.png"
              width={55}
              height={55}
              alt="img"
              className="ms-4"
            />
            <div className="text-2xl font-semibold mb-5 mt-20 leading-none">
              الخدمات الرئىيسية
            </div>
            <ul className="my-6 text-sm font-semibold">
              {list.map((item, index) => (
                <li key={index} className="" onClick={toggleSidebar}>
                  <div key={index}>
                    <ArrowList
                      title={item.title}
                      desc={item.desc}
                      icon={item.icon}
                      bgColor={item.bgColor}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
      <div className="lg:ml-80"></div>
    </div>
  );
};

export default MainSidebar;
