import React from "react";
import { Outlet } from "react-router";

const PrivateLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
