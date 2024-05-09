"use client";

import React from "react";
import { useState, createContext } from "react";

export const CommandeContext = createContext();

export default function CommandeContextProvider({ children }) {
  const [commandeInfo, setCommandeInfo] = useState({
    userSurname: undefined,
    userName: undefined,
    phone: undefined,
    delivery: {
      name: undefined,
      road: undefined,
      CP: undefined,
      city: undefined,
      country: undefined,
      id: undefined,
    },
  });
  return (
    <CommandeContext.Provider
      value={{ commandeInfo: commandeInfo, setCommandeInfo: setCommandeInfo }}
    >
      {children}
    </CommandeContext.Provider>
  );
}
