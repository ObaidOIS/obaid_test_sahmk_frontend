import React from "react";

const MainBadge = ({title, badgeStyle}) => {
  return (
    <div className="text-center">
      <span
        className={`inline-flex items-center rounded-full py-1 px-6 group focus:outline-none ${badgeStyle}`}
        role="alert"
        tabindex="0"
      >
        <span className={`whitespace-nowrap inline-block font-semibold max-w-screen-2xl text-sm overflow-hidden `}>
          {title}
        </span>
      </span>
    </div>
  );
};

export default MainBadge;
