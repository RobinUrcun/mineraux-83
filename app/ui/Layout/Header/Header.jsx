import React from "react";
import Nav from "../../Components/Nav/Nav";
import UserInfo from "./UserInfo/UserInfo";
import Image from "next/image";

export default function Header() {
  return (
    <header className="header">
      <Image src="/Logo.png" width={460} height={160} alt="Mineraux 83" />

      <div className="headerWrapper">
        <Nav section="header" />
        <UserInfo />
      </div>
    </header>
  );
}
