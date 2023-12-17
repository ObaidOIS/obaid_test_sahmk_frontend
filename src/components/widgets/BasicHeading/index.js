import React from "react";

const BasicHeading = ({ heading, desc, styling, id }) => {
  return (
    <div className={`text-center mb-8 flex justify-center ${styling}`}>
      <div className="max-w-2xl ">
        <div className="text-3xl font-semibold mb-5 leading-none">
          {heading}
        </div>
        <p className=" font-semibold text-gray-400 leading-7 ">{desc}</p>
      </div>
    </div>
  );
};

export default BasicHeading;
