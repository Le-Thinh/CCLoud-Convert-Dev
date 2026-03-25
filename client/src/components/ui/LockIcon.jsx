import React from "react";

const LockIcon = () => {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      className="shrink-0 opacity-30"
    >
      <rect
        x="2"
        y="5"
        width="8"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M4 5V3.5a2 2 0 1 1 4 0V5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LockIcon;
