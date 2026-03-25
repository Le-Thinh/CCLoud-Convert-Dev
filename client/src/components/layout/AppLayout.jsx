import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import SubNavbar from "./SubNavbar";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      <Navbar />

      <SubNavbar />

      <Outlet />
    </div>
  );
};

export default AppLayout;
