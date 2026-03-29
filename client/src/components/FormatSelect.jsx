import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FORMAT_CATEGORIES,
  FORMAT_MIME_MAP,
  FORMAT_OPTIONS,
  getLabel,
  getMime,
} from "../configs/format.config";

const FormatSelect = ({ value, onChange, allowedMimes }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActive] = useState("Image");

  const ref = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        searchRef.current?.focus();
      });
    }
  }, [open]);

  const allFormats = useMemo(
    () => [...new Set(FORMAT_CATEGORIES.flatMap((c) => c.formats))],
    [],
  );

  //filter
  const formats = useMemo(() => {
    if (search.trim()) {
      return allFormats.filter((f) =>
        f.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return (
      FORMAT_CATEGORIES.find((c) => c.label === activeCategory)?.formats ?? []
    );
  }, [search, activeCategory, allFormats]);

  const isAllowed = (label) => {
    if (!allowedMimes || allowedMimes.length === 0) return true;
    const mime = getMime(label);
    return mime ? allowedMimes.includes(mime) : false;
  };

  const getCategoryCount = (cat) => {
    if (!allowedMimes || allowedMimes.length === 0) return null;
    return cat.formats.filter(isAllowed).length;
  };

  const handleSelect = (label) => {
    if (!isAllowed(label)) return;
    const mime = getMime(label);
    onChange(mime ?? label);
    setOpen(false);
    setSearch("");
  };

  const displayValue = value ? getLabel(value) : null;

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <div className="flex gap-2 items-center justify-center ">
        <button
          onClick={() => setOpen((v) => !v)}
          className={`flex items-center gap-1.5 border rounded-md px-2.5 py-1.5 text-xs font-mono font-medium transition-all min-w-16 justify-between ${
            displayValue
              ? "border-zinc-300 text-zinc-800 bg-white hover:bg-[#202020] hover:text-white"
              : "border-zinc-200 text-zinc-400 bg-zinc-50 hover:border-zinc-300"
          }`}
        >
          <span className="text-[16px]">{displayValue || "..."}</span>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path
              d="M2 3.5l3 3 3-3"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {displayValue && (
          <div className="border group border-zinc-200 rounded-md p-2 cursor-pointer hover:bg-[#202020] transition-colors">
            <svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              className="text-zinc-700 group-hover:text-white"
            >
              <path
                d="M8.5 2a3 3 0 0 0-2.83 4L2 9.5 2.5 11.5l1.5.5L7.92 8.33A3 3 0 1 0 8.5 2z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="8.5" cy="5" r="1" fill="currentColor" />
            </svg>
          </div>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full right-0 mt-1.5 bg-white border border-zinc-200 rounded-xl shadow-xl shadow-zinc-200/50 z-30 w-85">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-zinc-100">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="text-zinc-400 shrink-0"
            >
              <circle
                cx="6"
                cy="6"
                r="4"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <path
                d="M9.5 9.5l2.5 2.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search format"
              className="flex-1 text-[13px] outline-none bg-transparent text-zinc-800 placeholder:text-zinc-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-zinc-400 hover:text-zinc-600 text-base leading-none"
              >
                ×
              </button>
            )}
          </div>

          <div className="flex" style={{ height: "260px" }}>
            {!search && (
              <div className="w-30 border-r border-zinc-100 py-1.5 overflow-y-auto shrink-0">
                {FORMAT_CATEGORIES.map((cat) => {
                  const count = getCategoryCount(cat);
                  return (
                    <button
                      key={cat.label}
                      onClick={() => setActive(cat.label)}
                      className={`w-full text-left flex items-center justify-between px-3.5 py-2 text-[13px] transition-colors ${
                        activeCategory === cat.label
                          ? "text-zinc-900 font-medium bg-zinc-50"
                          : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50"
                      }`}
                    >
                      <span>{cat.label}</span>
                      {count !== null && count > 0 && (
                        <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-200 rounded-full px-1.5 font-mono">
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Right — format buttons */}
            <div className="flex-1 p-3 overflow-y-auto">
              {formats.length === 0 ? (
                <p className="text-[12px] text-zinc-400 text-center mt-6">
                  No formats found
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-1.5">
                  {formats.map((fmt) => {
                    const allowed = isAllowed(fmt);
                    const selected = displayValue === fmt;
                    return (
                      <button
                        key={fmt}
                        onClick={() => handleSelect(fmt)}
                        disabled={!allowed}
                        title={
                          !allowed ? "Not supported for this file type" : ""
                        }
                        className={`rounded-lg py-2.5 text-[12px] font-mono font-medium border transition-all ${
                          selected
                            ? "bg-red-500 border-red-500 text-white"
                            : allowed
                              ? "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300"
                              : "bg-zinc-50 border-zinc-100 text-zinc-300 cursor-not-allowed"
                        }`}
                      >
                        {fmt}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormatSelect;
