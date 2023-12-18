import React from "react";
import { RadioGroup } from "@headlessui/react";

const RadioTabs = ({ frequencies, setFrequency, frequency }) => {

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <RadioGroup
      value={frequency}
      onChange={setFrequency}
      className="grid grid-cols-2 gap-x-1 rounded-full bg-black/5 p-1 text-center text-xs font-semibold leading-5 text-white"
    >
      <RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
      {frequencies.map((option) => (
        <RadioGroup.Option
          key={option.value}
          value={option}
          className={({ checked }) =>
            classNames(
              checked ? "bg-accentColor text-whitColor" : "text-darkColor",
              "cursor-pointer rounded-full px-2.5 py-1"
            )
          }
        >
          <span>{option.label}</span>
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
};

export default RadioTabs;
