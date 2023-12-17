import React from 'react';

const BasicModal = ({ children, heading }) => {
  return (
    <div
      data-modal="example2"
      className="fixed inset-0 w-full h-full z-20 outline-none  overflow-y-auto transition-all"
    >
      <div
        data-modal-toggle="example2"
        data-modal-action="close"
        className="fixed inset-0 w-full h-full bg-black bg-opacity-50"
      ></div>
      <div
        data-modal-main="example2"
        className="modal fixed pointer-events-auto transition-all duration-300 transform w-full h-screen flex items-center mx-auto"
      >
        <div className="relative shadow-lg rounded-2xl bg-white w-2/5 text-gray-800 max-w-screen-sm max-h-screen overflow-y-scroll mx-auto">
          <header className="flex items-center justify-between py-4 px-7">
            <h2 className="font-semibold">{heading}</h2>
            <button
              data-modal-toggle="example2"
              data-modal-action="close"
              className="transition-colors hover:bg-gray-50 focus:ring focus:outline-none p-2 rounded-full"
            >
              <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18">
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                ></path>
              </svg>
            </button>
          </header>
          <main className="p-2 text-center">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default BasicModal;
