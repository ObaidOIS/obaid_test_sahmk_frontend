import React from "react";

const RememberNoteUI = ({ icon, text }) => {
  return (
    <div>
      <div className="sm:flex">
        <div className="mb-4 flex-shrink-0 sm:mb-0 sm:ml-4">{icon}</div>
        <div>
          <p className="mt-1 text-sm text-gray-400">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default RememberNoteUI;
