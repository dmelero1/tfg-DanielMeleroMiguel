import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar/Sidebar";

const PrivateLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-16 sm:ml-20 md:ml-50 w-full p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;