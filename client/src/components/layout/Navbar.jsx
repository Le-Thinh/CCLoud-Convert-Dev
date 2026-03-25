import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavItemDropdown from "../ui/nav/NavItemDropdown";
import { API_MENU, TOOLS_MENU } from "../../configs/format.config";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="h-13 border-b border-zinc-200 flex items-center px-6 justify-around sticky top-0 bg-white/90 backdrop-blur z-10">
      <Link to="/">
        <span className="text-[15px] font-semibold tracking-tight">
          CCLoudConvert
          <sup className="text-[10px] text-zinc-400 font-normal ml-0.5">
            dev
          </sup>
        </span>
      </Link>
      <div className="flex items-center gap-1 text-sm text-zinc-600">
        <NavItemDropdown label={"Tools"} menu={TOOLS_MENU} />
        <NavItemDropdown label={"API"} menu={API_MENU} />

        {["Pricing", "Docs"].map((l) => (
          <button
            key={l}
            className="px-3 py-1.5 rounded-md hover:bg-zinc-100 hover:text-zinc-900 transition-colors flex items-center"
          >
            {l}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/login")}
          className="px-3 py-1.5 text-sm text-zinc-500 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer"
        >
          Log in
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-3.5 py-1.5 text-sm font-medium bg-zinc-900 text-white rounded-md hover:bg-zinc-700 transition-colors cursor-pointer"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
