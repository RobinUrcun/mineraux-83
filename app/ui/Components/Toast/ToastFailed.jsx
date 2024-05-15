import React from "react";

export default function ToastFailed({ children }) {
  return (
    <div id="toastFailed" className="toast">
      {children}
    </div>
  );
}
