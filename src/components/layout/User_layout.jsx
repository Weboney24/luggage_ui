import React from "react";
import Nav from "../nav/Nav";
import Foot from "../foot/Foot";
import { Outlet } from "react-router-dom";

const User_layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <div className="flex-grow">
        <Outlet />
      </div>

      <Foot />
    </div>
  );
};

export default User_layout;
