import React from "react";

const SelectBoxUI = ({ options, title, defaultValue, name, handleChange, value }) => {
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
        onChange={handleChange}
        name={name}
        className="mt-2 block w-full outline-none rounded-md border-0 py-1.5 pr-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primaryColor sm:text-sm sm:leading-6"
        defaultValue={defaultValue}
        value={value}
      >
        {/* Non-selectable prompt option */}
        <option value="" disabled>
          اختر شركة
        </option>

        {options.map((option) => {
          return (
            <option
              key={option.id}
              value={option.name}
              data-price={option.stock_price}
              data-symbol={option.symbol}
            >
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectBoxUI;
