import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function UserInfo() {
  return (
    <div className="userInfo">
      <div className="userInfoAuth">
        <button>Connexion</button>
        <button>Inscription</button>
      </div>
      <Link href="/panier" className="userInfoShoppingCart">
        <Image src="/assets/panier.png" width={40} height={40} alt="panier" />
      </Link>
    </div>
  );
}
