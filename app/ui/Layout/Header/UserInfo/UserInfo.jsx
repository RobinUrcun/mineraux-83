import React from "react";
import Image from "next/image";

export default function UserInfo() {
  return (
    <div className="userInfo">
      <div className="userInfoAuth">
        <button>Connexion</button>
        <button>Inscription</button>
      </div>
      <div className="userInfoShoppingCart">
        <Image src="/assets/panier.png" width={40} height={40} alt="panier" />
      </div>
    </div>
  );
}
