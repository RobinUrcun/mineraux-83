"use client";

import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function userInfoAuth() {
  useEffect(() => {
    const userId = localStorage.getItem("userInfoUserId");
    console.log(userId);
  }, []);
  return (
    <div className="userInfoAuth">
      <Link href="/login">Connexion</Link>
      <Link href="/signup">Inscription</Link>
    </div>
  );
}
