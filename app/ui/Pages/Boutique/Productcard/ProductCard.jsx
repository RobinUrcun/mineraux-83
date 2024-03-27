"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { addToCart } from "@/app/utils/cart/addToCart";

export default function ProductCard({ product }) {
  return (
    <Link href={`/produit/id`} className="productCard">
      <div className="productCardImgCont">
        <img src={product.image} alt="ok" className="productCardImg" />
      </div>
      <div className="productCardInfo">
        <div className="productCardInfoCont">
          <h2 className="productCardName">{product.title}</h2>
          <p className="productCardPrice">
            {(product.price / 100).toLocaleString("fr-FR", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
        <div onClick={addToCart} className="productCardAdd">
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
