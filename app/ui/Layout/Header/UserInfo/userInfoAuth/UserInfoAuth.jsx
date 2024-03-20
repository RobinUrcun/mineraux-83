"use client";

import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "@/app/utils/context/userContext";
import { disconnect } from "process";
import Image from "next/image";

export default function userInfoAuth() {
  const { isUserConnected, setIsUserConnected } = useContext(UserContext);
  function deconnection() {
    localStorage.clear();
    setIsUserConnected(false);
  }
  if (isUserConnected === false) {
    return (
      <div className="userInfoAuthDisconect">
        <Link href="/login">Connexion</Link>
        <Link href="/signup">Inscription</Link>
      </div>
    );
  } else {
    return (
      <div className="userInfoAuthConect">
        <Link href="/monCompte">Mon compte</Link>
        <Image
          onClick={deconnection}
          src="/form/logo_disconect.png"
          width={30}
          height={34}
          alt="Cliquer pour vous déconnecter"
        />
      </div>
    );
  }
}
