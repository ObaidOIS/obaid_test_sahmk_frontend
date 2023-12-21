import React from "react";

const RememberNoteUI = ({ icon, text }) => {
  return (
    <div>
      <div class="sm:flex">
        <div class="mb-4 flex-shrink-0 sm:mb-0 sm:ml-4">{icon}</div>
        <div>
          <p class="mt-1 text-sm text-gray-400">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default RememberNoteUI;
