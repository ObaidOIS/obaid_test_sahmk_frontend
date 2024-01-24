"use client";
import { Fragment, useState, useRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { InboxIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';

const NotificationAlert = ({setOpenModal, alertStyle, message, icon, title, button, isOpen, onClick }) => {

  const notificationRef = useRef(null);

    // Close the notification when clicking outside it
  const handleClickOutside = (e) => {
    if (notificationRef.current && !notificationRef.current.contains(e.target)) {
      setOpenModal(false)
    }
  }

  
  useEffect(() => {
    // Close the modal after 2000 milliseconds (2 seconds)
    const timeoutId = setTimeout(() => {
      setOpenModal(false);
    }, 4000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []); 


  useEffect(() => {
    // Attach click event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside)

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])


  return (
    <>
    {/* Global notification live region, render this permanently at the end of the document */}
    <div
      aria-live="assertive"
      className="pointer-events-none z-50 fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
        <Transition
          show={isOpen}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            ref={notificationRef}
            className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 ${alertStyle}`}
          >
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 ml-3">
                    {icon}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">{title}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {message}
                  </p>
                  <div className="mt-3 flex space-x-7 gap-x-7">
                    {button.href ? 
                    <Link
                      href={button.href}
                      className="rounded-md bg-white text-sm font-medium text-primaryColor hover:text-primaryColor/80 focus:outline-none focus:ring-2 focus:ring-primaryColor/80 focus:ring-offset-2"
                    >
                      {button.name}
                    </Link> : 
                    <div onClick={onClick} className=" cursor-pointer rounded-md bg-white text-sm font-medium text-primaryColor hover:text-primaryColor/80 focus:outline-none focus:ring-2 focus:ring-primaryColor/80 focus:ring-offset-2">
                      {button.name}
                    </div>}
                    <button
                      type="button"
                      onClick={() => {
                        setOpenModal(false)
                      }}
                      className="rounded-md bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primaryColor/80 focus:ring-offset-2"
                    >
                      يغلق
                    </button>
                  </div>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primaryColor/80 focus:ring-offset-2"
                    onClick={() => {
                      setOpenModal(false)
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </>
  )
}

export default NotificationAlert
