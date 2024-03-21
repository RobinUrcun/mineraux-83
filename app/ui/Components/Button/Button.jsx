import React from "react";

export default function Button({ children, type, disabled }) {
  if (disabled == "true") {
    return (
      <button className="button disabled" type={type} disabled>
        {children}
      </button>
    );
  } else
    return (
      <button className="button" type={type}>
        {children}
      </button>
    );
}
