import React from "react";
import { SA } from "country-flag-icons/react/3x2";

const PhoneNumberUI = ({
  title,
  placeholder,
  dataList,
  activeItem,
  handleChange,
  value,
  handleMenuItemClick,
  setActiveItem,
  isValid,
  required
}) => {
  return (
    <div>
      <label
        htmlFor="phone-number"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {title}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 flex items-center">
          <label htmlFor="country" className="sr-only">
            {activeItem ?? "+966"}
          </label>
          <select
            id="country"
            name="country"
            autoComplete="country"
            className={`h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 ml-2 text-gray-500 outline-none focus:ring-inset focus:ring-primaryColor sm:text-sm`}
            onChange={(e) => handleMenuItemClick(e.target.value)}
          >
            {dataList?.map((item, index) => (
              <option key={index} value={item.dial_code}>
                {item.dial_code}
              </option>
            ))}
          </select>
        </div>
      <input
        type='text'
        name="phone-number"
        id="phone-number"
        className={`block w-full appearance-none outline-none rounded-md border-0 py-1.5 pl-20 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${isValid ? 'focus:ring-primaryColor' : 'focus:ring-redColor'} sm:text-sm sm:leading-6`}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        required={required}
      />
      </div>
    </div>
  );
};

export default PhoneNumberUI;
