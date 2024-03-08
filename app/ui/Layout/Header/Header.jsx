import React from "react";
import Nav from "../../Components/Nav/Nav";
import UserInfo from "./UserInfo/UserInfo";

export default function Header() {
  return (
    <header className="header">
      <Nav section="header" />
      <UserInfo />
    </header>
  );
}
