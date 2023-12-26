import React from "react";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SwitchUI = ({ handleSwitch, isChecked, label }) => {
  return (
    <div className="flex items-center">
    <button
      onClick={() => {
        handleSwitch();
      }}
      type="button"
      className={classNames(
        isChecked ? "bg-primaryColor" : "bg-gray-200",
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-offset-2"
      )}
    >
      <span
        className={classNames(
          isChecked ? "translate-x-0" : "-translate-x-5",
          "pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        )}
      >
        <span
          className={classNames(
            isChecked
              ? "opacity-0 duration-100 ease-out"
              : "opacity-100 duration-200 ease-in",
            "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
          )}
          aria-hidden="true"
        >
        </span>
        <span
          className={classNames(
            isChecked
              ? "opacity-100 duration-200 ease-in"
              : "opacity-0 duration-100 ease-out",
            "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
          )}
          aria-hidden="true"
        >
        </span>
      </span>
    </button>
    {label}
    </div>
  );
};

export default SwitchUI;
