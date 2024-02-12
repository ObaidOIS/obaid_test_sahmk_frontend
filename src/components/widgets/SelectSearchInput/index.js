"use client";
import React, { useState, useEffect, useRef } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SelectSearchInput = ({
  options,
  title,
  defaultValue,
  name,
  handleChange,
  value,
}) => {

  const [isFocused, setIsFocused] = useState(false);
  const preventKeyboard = useRef(false);
  const dropdownRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(options);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = options.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.id.toString().toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

//  const handleFocus = (e) => {
//     console.log(preventKeyboard.current, e, "hello keyboard")
//     if (preventKeyboard.current) {
//       e.preventDefault();
//       preventKeyboard.current = false;
//     }else{

//     // Toggle the flag for the next focus event
//     // preventKeyboard.current = !preventKeyboard.current;
//     preventKeyboard.current = true;}

//   }; 

const handleFocus = (e) => {
  // Update the focus state
  setIsFocused(true);
};

const handleBlur = () => {
  // Reset the focus state when the input is blurred
  setIsFocused(false);
  setShowKeyboard(false);
};

const handleClick = () => {
  console.log(isFocused, showKeyboard, "isFocused");
  isFocused == true ? setShowKeyboard(true) : setShowKeyboard(false);
}

  const handleItemClick = (item) => {
    setSelected(item.id);
    // Create a synthetic event object
    const syntheticEvent = {
      target: {
        name: name,
        value: item.name,
        getAttribute: (attr) => {
          if (attr === 'data-symbol') return item.symbol;
          if (attr === 'data-price') return item.stock_price;
          return null;
        }
      }
    };

    handleChange(syntheticEvent);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const selectedItem = options.filter((item) => item.id === selected)[0];
  const selectedName =
    selectedItem != undefined && value == "" ? selectedItem.name : value;
  const placeholderText = dropdownOpen ? "" : selectedName;

  const inputText = dropdownOpen ? searchQuery : "";

  return (
    <div>
      <label
        id="listbox-label"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {title}
      </label>
      <div className="relative mt-2">
        <span className="pointer-events-none z-40 absolute inset-y-0 left-0 flex items-center pl-2">
          <ChevronUpDownIcon
            className="h-5 w-5 text-darkGreyColor"
            aria-hidden="true"
          />
        </span>
        <input
          type="text"
          value={ dropdownOpen == true ? searchQuery : placeholderText }
          onBlur={handleBlur}
          readOnly={!showKeyboard}
          inputMode={showKeyboard == true ? "none" : "text"}
          name={name}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          onFocus={() => {setDropdownOpen(!dropdownOpen); handleFocus();}}
          onClick={() => {setDropdownOpen(true); setSearchQuery(""); setFilteredData(options); handleClick()}}
          placeholder={placeholderText}
          className="relative w-full text-primaryColor cursor-default placeholder:text-primaryColor rounded-md bg-white py-2 pr-3 pl-10 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primaryColor sm:text-sm sm:leading-6"
        />
        {dropdownOpen && (
          <ul
            ref={dropdownRef}
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            tabIndex="-1"
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
          >
            {filteredData.map((item) => (
              <li
                key={item.id}
                className={` ${selected == item.id ? " bg-lightGreyColor/40" : ""
                  } hover:bg-lightGreyColor/50 border-y border-lightGreyColor/40 text-gray-900 relative cursor-pointer py-2 pl-3 pr-9`}
                id={`listbox-option-${item.id}`}
                role="option"
                onClick={() => {
                  handleItemClick(item);
                  setDropdownOpen(false);
                }}
                data-symbol={item.symbol}
                data-price={item.stock_price}
              >
                <span className="font-normal block truncate">
                  {item.name}
                  {selected == item.id ? (
                    <span
                      className={classNames(
                        "absolute inset-y-0 left-0 flex items-center pl-2 pr-4 text-primaryColor"
                      )}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectSearchInput;
