"use client";

import React from "react";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/app/utils/context/userContext";
import Image from "next/image";

export default function userInfoAuth({ setIsOpen }) {
  const { userInfo, setUserInfo } = useContext(UserContext);
  function deconnection() {
    localStorage.clear();
    setUserInfo({
      isUserConnected: false,
      userRole: false,
    });
  }
  if (!userInfo.isUserConnected) {
    return (
      <div className="userInfoAuthDisconect">
        <Link
          href="/login"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Connexion
        </Link>
        <Link
          href="/signup"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Inscription
        </Link>
      </div>
    );
  } else {
    return (
      <div className="userInfoAuthConect">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href={userInfo.userRole == "ADMIN" ? "/admin" : "/mon-compte"}
        >
          Mon compte
        </Link>
        <Image
          onClick={() => {
            deconnection();
            setIsOpen(false);
          }}
          src="/form/logo_disconect.png"
          width={30}
          height={30}
          alt="Cliquer pour vous déconnecter"
        />
      </div>
    );
  }
}
