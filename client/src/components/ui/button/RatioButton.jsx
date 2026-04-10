import React from "react";

const RatioButton = ({ value, onChange, yesLabel = "Yes", noLabel = "No" }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {[true, false].map((v) => (
        <label
          key={String(v)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div
            onClick={() => onChange(v)}
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
              value === v ? "border-red-500" : "border-zinc-300"
            }`}
          >
            {value === v && <div className="w-2 h-2 rounded-full bg-red-500" />}
          </div>
          <span className="text-sm text-zinc-700">
            {v ? yesLabel : noLabel}
          </span>
        </label>
      ))}
    </div>
  );
};

export default RatioButton;
