import React, {useEffect} from 'react'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'

const SuccessAlert = ({setOpenModal, alertStyle, message}) => {

    useEffect(() => {
        // Close the modal after 2000 milliseconds (2 seconds)
        const timeoutId = setTimeout(() => {
          setOpenModal(false);
        }, 4000);
    
        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timeoutId);
      }, []); 
    
    
  return (
    <div className={`rounded-md bg-whiteColor w-96 py-4 px-4 ${alertStyle}`}>
      <div className="flex">
      <div className="flex-shrink-0">
          <CheckCircleIcon className="h-5 w-5 text-primaryColor" aria-hidden="true" />
        </div>
        <div className="mr-3">
          <p className="text-sm font-medium text-primaryColor">{message}</p>
        </div>
        <div className="mr-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
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

export default SuccessAlert
