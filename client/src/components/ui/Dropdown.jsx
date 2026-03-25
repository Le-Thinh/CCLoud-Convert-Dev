import React from "react";
import { useNavigate } from "react-router-dom";
import LockIcon from "./LockIcon";

const Dropdown = ({ menu, onClose }) => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.lock) return;
    navigate(`/${item.slug}`);
    onClose();
  };

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 bg-white border border-zinc-200 rounded-xl shadow-xl shadow-zinc-200/60 py-5 px-5 z-50">
      {/* Caret arrow */}
      <div className="absolute -top-1.75 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-zinc-200 rotate-45 rounded-tl-sm" />

      <div className="flex gap-6">
        {menu.map((col) => (
          <div key={col.heading} className="min-w-40">
            <p className="text-[10px] font-semibold tracking-[1.5px] text-zinc-400 px-2 mb-2">
              {col.heading}
            </p>
            <div className="h-px bg-zinc-100 mb-1.5" />
            <ul>
              {col.items.map((item) => (
                <li key={item.slug}>
                  <button
                    onClick={() => handleClick(item)}
                    className={`w-full text-left flex items-center justify-between gap-2 px-2 py-1.5 rounded-md text-[13px] transition-colors duration-100 ${
                      item.lock
                        ? "text-zinc-400 cursor-default"
                        : "text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 cursor-pointer"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.lock && <LockIcon />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
