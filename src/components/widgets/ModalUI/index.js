import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "../PrimaryButton";

const ModalUI = ({ title, button, onClickHandle, content, onClose, isOpen }) => {
  return (
    <div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>onClose()}>
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
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 shadow-xl transition-all sm:my-8 w-full sm:max-w-lg sm:p-6">
                  <div className="absolute left-0 top-0 pl-4 pt-4 block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => onClose()}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="">
                    <div className="mt-3 sm:ml-4 sm:mt-0 text-start ">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-small leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                      {content}
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 ">
                    <div className="sm:flex sm:flex-row-reverse" onClick={()=>{onClickHandle(); onClose()}}>
                    <PrimaryButton
                      button={button}
                      buttonStyle="py-4 rounded-md !font-normal w-full justify-center mt-6"
                    />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default ModalUI;
