import React from "react";

const MainBadge = ({title, badgeStyle, icon}) => {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full text-xs font-medium ${badgeStyle}`}>
      <span>{icon}</span>
        {title}
      </span>
  );
};

export default MainBadge;
