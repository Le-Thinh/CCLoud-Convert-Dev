import React, { useEffect, useRef, useState } from "react";
import Dropdown from "../Dropdown";

const NavItemDropdown = ({ label, menu }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative transition-all duration-300">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-0.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
          open
            ? "bg-zinc-100 text-zinc-900"
            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
        }`}
      >
        {label}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className={`transition-transform duration-150 mt-px ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M3 5l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && <Dropdown menu={menu} onClose={() => setOpen(false)} />}
    </div>
  );
};

export default NavItemDropdown;
