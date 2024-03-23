"use client";

import { useState, useEffect, createContext } from "react";

export const UserContext = createContext();
export default function UserInfo({ children }) {
  const [userInfo, setUserInfo] = useState({
    isUserConnected: !!localStorage.getItem("userInfoUserId"),
    userRole: localStorage.getItem("userInfoRole") || false,
  });

  // useEffect(() => {
  //   if (!localStorage.getItem("userInfoUserId")) {
  //     setUserInfo({
  //       userRole: false,
  //       isUserConnected: false,
  //     });
  //   } else {
  //     setUserInfo({
  //       userRole: localStorage.getItem("userInfoRole"),
  //       isUserConnected: true,
  //     });
  //   }
  // }, []);

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
