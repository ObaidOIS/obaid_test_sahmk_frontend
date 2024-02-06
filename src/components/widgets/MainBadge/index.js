import React from "react";

const MainBadge = ({title, badgeStyle, icon, dir}) => {
  return (
    <span dir={dir} className={`inline-flex items-center gap-1 rounded-full text-xs font-medium ${badgeStyle}`}>
        {title}
        <span>{icon}</span>
      </span>
  );
};

export default MainBadge;
