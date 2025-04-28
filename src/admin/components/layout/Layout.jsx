import React, { useState } from "react";
import Topnav from "../topnav/Topnav";
import SideNav from "../sidenav/SideNav";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideNav collapsed={collapsed} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        <Topnav onToggoleSidebar={handleToggle} collapsed={collapsed} />
        <div className="p-4 mt-[50px] overflow-auto transition-all duration-300">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
