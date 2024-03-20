"use client";

import { useState, createContext } from "react";

export const UserContext = createContext();
export default function UserInfo({ children }) {
  const localStorageContent = !localStorage.getItem("userInfoUserId")
    ? false
    : true;
  const [isUserConnected, setIsUserConnected] = useState(localStorageContent);
  return (
    <UserContext.Provider
      value={{
        isUserConnected: isUserConnected,
        setIsUserConnected: setIsUserConnected,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
