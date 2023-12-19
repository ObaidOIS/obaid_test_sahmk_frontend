import React from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { CheckIcon } from "@heroicons/react/20/solid";

const AddList = ({ dataList, selected }) => {
  return (
    <div>
      <ul role="list" className="mt-4 grid grid-cols-1 gap-4">
        {dataList.map((person, personIdx) => (
          <li key={personIdx}>
            <button
              type="button"
              className={`group flex w-full items-center justify-between space-x-3 rounded-full border ${
                person.selected
                  ? "border-accentColor"
                  : "border-gray-300"
              } p-1 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accentColor focus:ring-offset-2`}
            >
              <span className="flex min-w-0 flex-1 items-center space-x-3">
                {person.imageUrl ? (
                  <span className="block flex-shrink-0">
                    <Image
                      width={20}
                      heiight={20}
                      alt="image"
                      className="h-10 w-10 rounded-full"
                      src={person.imageUrl}
                    />
                  </span>
                ) : (
                  ""
                )}
                <span className="min-w-0 flex justify-end">
                  <span className="block truncate text-sm font-medium mr-6 text-gray-900">
                    {person.name}
                  </span>
                  <span className="block truncate text-sm font-medium text-gray-500">
                    {person.role}
                  </span>
                </span>
              </span>
              <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center">
                {person.selected ? (
                  <CheckIcon
                    className="h-6 w-5 flex-none text-accentColor"
                    aria-hidden="true"
                  />
                ) : (
                  <PlusIcon
                    className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddList;
