import React from "react";

const InputField = ({ title, type, placeholder, name }) => {
  return (
    <div>
      <label
        for="first_name"
        className="block mb-3 ms-2 text-teal-950"
      >
        {title}
      </label>
      <input 
        type={type}
        id="first_name"
        className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-3"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
