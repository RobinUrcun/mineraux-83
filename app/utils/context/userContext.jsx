"use client";

import { useState, createContext } from "react";

export const UserContext = createContext();
export default function UserInfo({ children }) {
  const [userInfo, setUserInfo] = useState({
    isUserConnected: !localStorage.getItem("userInfoUserId") ? false : true,
    userRole: !localStorage.getItem("userInfoRole")
      ? false
      : localStorage.getItem("userInfoRole"),
  });

  return (
    <UserContext.Provider
      value={{
        userInfo: userInfo,
        setUserInfo: setUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
