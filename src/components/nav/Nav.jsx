import React, { useEffect, useState } from "react";
import Image_Helper from "../../helper/Image_Helper";
import { Link } from "react-router-dom";
import moment from "moment";

const Nav = () => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-[60px] w-full text-sm bg-primary center_div justify-between sticky top-0 !z-50 px-5 md:px-10 lg:px-20 flex">
      {/* Left side - Logo */}
      <div className="flex items-center justify-start px-0">
        <Link to="/" className="lg:w-[31%] flex justify-start items-start">
          <img src={Image_Helper.SUBHAM_LOGO} alt="logo" className="w-[120px]  md:w-[440px] h-[40px] bg-white p-2" />
        </Link>
      </div>

      <div></div>

      {/* Right side - Login Button */}
      <div className="center_div gap-10">
        <div className="text-white text-sm md:text-base text-left font-bold leading-tight">
          <div>{currentTime.format("DD MMM YYYY")}</div>
          <div>{currentTime.format("hh:mm:ss A")}</div>
        </div>

        <Link to="/login" className="text-white border border-white px-4 py-1 rounded hover:bg-white hover:text-primary transition">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Nav;
