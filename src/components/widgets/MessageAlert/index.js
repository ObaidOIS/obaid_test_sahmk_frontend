import React, {useEffect} from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'

const MessageAlert = ({setOpenModal, alertStyle, message, icon, title}) => {

    useEffect(() => {
        // Close the modal after 2000 milliseconds (2 seconds)
        const timeoutId = setTimeout(() => {
          setOpenModal(false);
        }, 4000);
    
        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timeoutId);
      }, []); 
    
    
  return (
    <div className={`rounded-md shadow-2xl border z-50 bg-whiteColor w-96 py-4 px-4 ${alertStyle}`}>
      <div className="flex">
      <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="mr-3">
          <p className="text-sm font-medium">{title}</p>
          <p className={` ${message ? "mt-2" : ""} text-sm opacity-80`} >{message}</p>
        </div>
        <div className="mr-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex rounded-md p-1.5  focus:outline-none focus:ring-2  focus:ring-offset-2 "
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" onClick={()=>setOpenModal(false)} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageAlert
