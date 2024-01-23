import React from "react";
import { CgClose } from "react-icons/cg";
import ArrowList from "@/components/widgets/ArrowList";
import Image from "next/image";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import IconButtonUI from "../IconButtonUI";
import Link from "next/link";

const MainSidebar = ({
  isSidebarOpen,
  toggleSidebar,
  list,
  setIsSidebarOpen,
  handlePageChange,
}) => {
  return (
    <Transition.Root show={isSidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={toggleSidebar} open={isSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className=" pb-6 mt-4">
                        <Image loading="eager"  
                          src="/assets/logos/logo.svg"
                          width={150}
                          height={150}
                          alt="img"
                          className="ms-4"
                          priority
                        />
                        <ul className="my-10 space-y-5 text-sm font-semibold">
                          {list.map((item, index) => (
                            <li
                              key={index}
                              onClick={() => {
                                handlePageChange(item.page);
                                toggleSidebar();
                              }}
                              className=""
                            >
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
                        <div className="border-t space-y-4 py-5 ">
                          <IconButtonUI
                            button="EN"
                            icon={
                              <Image loading="eager"  
                                src="/assets/icons/globe.svg"
                                width={20}
                                height={20}
                                alt="img"
                                className="me-5"
                                priority
                              />
                            }
                            buttonStyle="text-darkColor hover:bg-whiteColor hover:border-whiteColor hover:text-darkGreyColor bg-whiteColor !shadow-none"
                          />
                          <div>
                            <Link href="/auth/logout" >
                            <IconButtonUI
                              button="تسجيل الخروج"
                              icon={
                                <Image loading="eager"  
                                  src="/assets/icons/logout.svg"
                                  width={20}
                                  height={20}
                                  alt="img"
                                  className="me-5"
                                  priority
                                />
                              }
                              buttonStyle="text-darkColor hover:bg-whiteColor hover:border-whiteColor hover:text-darkGreyColor bg-whiteColor !shadow-none"
                            />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MainSidebar;
