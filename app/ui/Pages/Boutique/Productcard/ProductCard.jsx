import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard() {
  return (
    <Link href={`/produit/id`} className="productCard">
      <div className="productCardImgCont">
        <Image
          src="/assets/exempleCard.png"
          width={336}
          height={500}
          alt="ok"
          className="productCardImg"
        />
      </div>
      <div className="productCardInfo">
        <div className="productCardInfoCont">
          <h2 className="productCardName">Diorite</h2>
          <p className="productCardPrice">64.00€</p>
        </div>
        <div className="productCardAdd">
          <Image
            src="/assets/panier.png"
            width={40}
            height={40}
            alt="Ajouter au panier"
          />
        </div>
      </div>
    </Link>
  );
}
