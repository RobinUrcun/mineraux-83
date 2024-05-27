"use client";

import React from "react";
import { useState, createContext } from "react";

export const CommandeContext = createContext();

export default function CommandeContextProvider({ children }) {
  const [deliveryInfo, setDeliveryInfo] = useState({
    deliveryCompany: "",
    name: "",
    road: "",
    CP: "",
    city: "",
    country: "",
    id: "",
  });
  const [commandeInfo, setCommandeInfo] = useState({
    userSurname: "",
    userName: "",
    phone: "",
  });
  return (
    <CommandeContext.Provider
      value={{
        commandeInfo: commandeInfo,
        setCommandeInfo: setCommandeInfo,
        deliveryInfo: deliveryInfo,
        setDeliveryInfo: setDeliveryInfo,
      }}
    >
      {children}
    </CommandeContext.Provider>
  );
}
