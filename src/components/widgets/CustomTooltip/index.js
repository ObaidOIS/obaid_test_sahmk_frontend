import React from "react";

const CustomTooltip = ({text}) => {
  return (
    <>
      <div className="tooltip bg-whiteColor shadow-xl p-2 rounded absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100">
        <p className="m-0 whitespace-nowrap">
          {text}
        </p>
        <svg
          class="absolute text-whiteColor h-2 w-full left-0 top-full"
          x="0px"
          y="0px"
          viewBox="0 0 255 255"
        >
          <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
    </>
  );
};

export default CustomTooltip;
