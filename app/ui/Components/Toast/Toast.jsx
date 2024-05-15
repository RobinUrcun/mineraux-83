import React from "react";

export default function Toast({ children }) {
  return (
    <div id="toast" className="toast">
      {children}
    </div>
  );
}
