import React from "react";
import Icon_Helper from "../../../helper/Icon_Helper";
import { FiSettings } from "react-icons/fi";

const Topnav = ({ onToggoleSidebar, collapsed }) => {
  return (
    <div className={`bg-primary h-[57px] w-full fixed top-0 z-10 flex items-center justify-between px-4 transition-all duration-300 ${collapsed ? "left-[70px]" : "left-[200px]"}`}>
      <div className="text-white flex items-center space-x-8">
        <h1 className="text-4xl cursor-pointer" onClick={onToggoleSidebar}>
          <Icon_Helper.ADMIN_ICON />
        </h1>
        <input placeholder="Search" className="rounded-4xl bg-white text-black p-2 w-[250px]" />
      </div>

      <div className="text-white text-xl cursor-pointer hover:text-orange-400">
        <FiSettings />
      </div>
    </div>
  );
};

export default Topnav;
