import React from "react";
import Image from "next/image";
import Link from "next/link";
import UserInfoAuth from "./userInfoAuth/UserInfoAuth";

export default function UserInfo({ setIsOpen }) {
  return (
    <div className="userInfo">
      <UserInfoAuth setIsOpen={setIsOpen} />
      <Link
        href="/panier"
        className="userInfoShoppingCart"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <Image src="/assets/panier.webp" width={40} height={40} alt="panier" />
      </Link>
    </div>
  );
}
