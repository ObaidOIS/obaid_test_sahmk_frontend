import React from "react";
import { RadioGroup } from "@headlessui/react";

const RadioTabs = ({ frequencies, setFrequency, frequency }) => {

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <fieldset className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center bg-whiteColor text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200">
        {frequencies.map((option) => (
        <label key={option.value} className={`${frequency.value === option.value ? 'bg-primaryColor text-white' : 'text-gray-500'} cursor-pointer rounded-full px-2.5 py-1`}>
          <input type="radio" name="frequency" 
            value={option.value}
            className="sr-only"
            checked={frequency.value === option.value}
            onChange={() => setFrequency(option)} />
           <span>{option.label}</span>
        </label>
      ))}
      </fieldset>
  );
};

export default RadioTabs;
