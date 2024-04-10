"use client";

import React from "react";
import { useState, createContext } from "react";

export const CommandeContext = createContext();

export default function CommandeContextProvider({ children }) {
  const [commandeInfo, setCommandeInfo] = useState({
    userSurname: null,
    userName: null,
    delivery: null,
  });
  return (
    <CommandeContext.Provider
      value={{ commandeInfo: commandeInfo, setCommandeInfo: setCommandeInfo }}
    >
      {children}
    </CommandeContext.Provider>
  );
}
