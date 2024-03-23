"use client";

import { useState, useEffect, createContext } from "react";

export const UserContext = createContext();
export default function UserInfo({ children }) {
  const [userInfo, setUserInfo] = useState({
    isUserConnected: null,
    userRole: null,
  });

  useEffect(() => {
    setUserInfo({
      isUserConnected: !!localStorage.getItem("userInfoUserId"),
      userRole: localStorage.getItem("userInfoRole") || false,
    });
  }, []);
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
