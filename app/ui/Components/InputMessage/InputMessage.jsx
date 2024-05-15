import React from "react";

export default function InputMessage({ children, classNames }) {
  return (
    <div
      className={
        classNames ? "errorMessage errorMessageDisplay" : "errorMessage  "
      }
    >
      {children}
    </div>
  );
}
