"use client";
import React from "react";
import Nav from "../../Components/Nav/Nav";
import UserInfo from "./UserInfo/UserInfo";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <Image
        src="/Logowebp.webp"
        width={460}
        height={160}
        alt="Mineraux 83"
        className="logo"
        priority={true}
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
