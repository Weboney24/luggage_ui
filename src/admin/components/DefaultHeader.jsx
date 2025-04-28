import React from "react";

const DefaultHeader = ({ title }) => {
  return (
    <div className="p-2 ">
      <h1 className="text-2xl font-semibold font-title">{title}</h1>
    </div>
  );
};

export default DefaultHeader;
