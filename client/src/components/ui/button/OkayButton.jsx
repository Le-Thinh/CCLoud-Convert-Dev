import React, { useEffect, useRef, useState } from "react";

const OkayButton = ({ onApply, onApplyAll }) => {
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
    <div ref={ref} className="relative flex">
      {/* Main button */}
      <button
        onClick={onApply}
        className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-5 py-2.5 rounded-l-lg transition-colors"
      >
        Okay
      </button>

      {/* Chevron */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-2.5 rounded-r-lg border-l border-red-500 transition-colors"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M2 4l4 4 4-4"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute bottom-full right-0 mb-1.5 bg-white border border-zinc-200 rounded-lg shadow-lg overflow-hidden w-52">
          <button
            onClick={() => {
              setOpen(false);
              onApply();
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            Apply to this file
          </button>
          <div className="h-px bg-zinc-100" />
          <button
            onClick={() => {
              setOpen(false);
              onApplyAll();
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            Apply to all files
          </button>
        </div>
      )}
    </div>
  );
};

export default OkayButton;
