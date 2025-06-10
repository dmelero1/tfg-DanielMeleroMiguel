import React, { useRef, useEffect } from "react";
import videoLogo from "./ImgDashboard/logoTFG.mp4";

const DashboardImg = () => {
  return (
    <div className="w-full bg-black text-white flex flex-col items-center justify-center text-center py-10 sm:py-0 px-4">      
      <video
        src={videoLogo}
        autoPlay
        loop
        muted
        playsInline
        className="w-96 sm:w-8/12 h-auto rounded-xl shadow-lg"
      />
    </div>
  );
};

export default DashboardImg;