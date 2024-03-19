import React from "react";
import Image from "next/image";
import Link from "next/link";
import UserInfoAuth from "./userInfoAuth/UserInfoAuth";

export default function UserInfo() {
  return (
    <div className="userInfo">
      <UserInfoAuth />
      <Link href="/panier" className="userInfoShoppingCart">
        <Image src="/assets/panier.png" width={40} height={40} alt="panier" />
      </Link>
    </div>
  );
}
