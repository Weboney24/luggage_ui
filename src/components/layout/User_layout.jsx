import React from 'react'
import Nav from "../nav/Nav";
import Foot from "../foot/Foot";
import { Outlet } from 'react-router-dom';

const User_layout = () => {
  return (
    <div>
          <Nav />
          <Outlet/>
          <Foot/>
    </div>
  )
}

export default User_layout
