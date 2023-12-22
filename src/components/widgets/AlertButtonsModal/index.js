import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const AlertButtonsModal = ({onClose, setIsOpen, isOpen, image, title, messageTitle, messageDesc, buttonOne, buttonTwo, buttonIcon, actionButton, messageType}) => {

    return (
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
  
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative space-y-10 transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto absolute top-[-100px] left-0 right-0 flex items-center justify-center">
                      {image}
                    </div>
                    <div className="mt-24 text-center">
                      <Dialog.Title as="h3" className={`border-b-2 pb-5 border-dashed text-base font-semibold leading-6 text-gray-900 ${messageType == "success" ? "text-primaryColor" : messageType == "error" ? "text-redColor" : "" } `}>
                        {title}
                      </Dialog.Title>
                      <div className="mt-5">
                        <p>{messageTitle}</p>
                        <p className="text-sm mt-3 text-gray-500">
                          {messageDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={`mt-5 sm:mt-6 pt-8 ${actionButton == true ? "sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3" : ""}`}>
                  
                    <button
                      type="button"
                      className={`inline-flex w-full order-1 justify-center rounded-md bg-secondaryColor px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primaryColor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColor `}
                      onClick={() => setIsOpen(false)}
                    >
                      {buttonOne}
                    </button>
                    {actionButton == true ? 
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full order-2 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
                      onClick={() => setIsOpen(false)}
                    >
                      {buttonTwo} <div className='mr-3'>{buttonIcon}</div> 
                    </button>
                    : "" }
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
  }
export default AlertButtonsModal
