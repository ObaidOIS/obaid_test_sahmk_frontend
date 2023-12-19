import React from "react";

const MainBadge = ({title, badgeStyle}) => {
  return (
    <span className={`inline-flex items-center rounded-full text-xs font-medium ${badgeStyle}`}>
        {title}
      </span>
  );
};

export default MainBadge;
