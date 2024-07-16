"use client";
import React from "react";
import Nav from "../../Components/Nav/Nav";
import UserInfo from "./UserInfo/UserInfo";
import Image from "next/image";
import { useState } from "react";
import { set } from "mongoose";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <Image
        src="/Logo.png"
        width={460}
        height={160}
        alt="Mineraux 83"
        className="logo"
      />
      <div className="headerUserInfo">
        <Image
          src="/form/logoMenu.webp"
          height={50}
          width={50}
          alt="Dérouler le menu"
          className={`scrollingMenu ${isOpen ? "scrollingMenuInvert" : ""}`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <div className={`headerWrapper ${isOpen ? "open" : ""}`}>
          <Nav section="header" setIsOpen={setIsOpen} />
          <UserInfo setIsOpen={setIsOpen} />
        </div>
      </div>
    </header>
  );
}
