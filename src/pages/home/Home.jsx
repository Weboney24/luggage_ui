import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative text-black font-bold text-2xl min-h-screen bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: "url('https://www.indolankaedunet.org/wp-content/uploads/2024/08/press_img_3_16Aug2024.jpeg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="relative z-10 space-y-6 center_div flex-col pt-[100px]">
        <div className="">
          <h1 className="text-5xl mt-[60px] font-title text-white">WELCOME TO</h1>
        </div>
        <div className="">
          <h1 className="text-8xl text-primary font-title">SUBHAM</h1>
        </div>
        <div className="">
          <button className="bg-primary text-white p-3 px-6 rounded hover:bg-white hover:text-primary transition" onClick={() => navigate("/barcodescanner")}>
            SCAN BAR CODE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
