"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { addToCart } from "@/app/utils/cart/addToCart";
import { useContext } from "react";
import { UserContext } from "@/app/utils/context/userContext";

export default function ProductCard({ product }) {
  const { userInfo, setUserInfo } = useContext(UserContext);
  return (
    <Link href={`/produit/${product._id}`} className="productCard">
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
        <div
          onClick={(e) => {
            e.preventDefault();
            addToCart(product._id, userInfo);
          }}
          className="productCardAdd"
        >
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
