import React from "react";
import Image_Helper from "../../../helper/Image_Helper";
import { Admin_side_menu } from "../../../helper/data_helper";
import { Link } from "react-router-dom";

const SideNav = ({ collapsed }) => {
  return (
    <div className={`bg-secondary ${collapsed ? "w-[70px]" : "w-[200px]"} flex-shrink-0 text-white transition-all duration-300 h-screen`}>
      {/* Logo */}
      <div className="p-4 bg-white flex justify-center">
        <img src={Image_Helper.SUBHAM_LOGO} alt="LOGO" className={`transition-all duration-300 ${collapsed ? "hidden" : "block"} w-200px`} />
      </div>

       <div className="mt-6 flex flex-col divide-y divide-white">
        {Admin_side_menu.map((res, index) => {
          const Icon = res.icon;
          return (
            <Link to={res.to} key={index} className="flex items-center gap-3 px-4 py-3 hover:bg-primary transition-colors">
              <Icon size={18}  />
              {!collapsed && <span className="text-lg font-title font-bold">{res.name}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideNav;
