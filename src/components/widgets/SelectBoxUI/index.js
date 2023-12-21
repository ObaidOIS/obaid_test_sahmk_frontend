import React from "react";

const SelectBoxUI = ({ options, title, defaultValue }) => {
  return (
    <div>
      <label
        htmlFor="location"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {title}
      </label>
      <select
        id="location"
        name="location"
        className="mt-2 block w-full rounded-md border-0 py-1.5 pr-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-accentColor sm:text-sm sm:leading-6"
        defaultValue={defaultValue}
      >
        {options.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </select>
    </div>
  );
};

export default SelectBoxUI;
