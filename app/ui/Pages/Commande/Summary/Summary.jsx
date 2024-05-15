"use client";

import React from "react";
import { useState, useEffect } from "react";
import SummaryCard from "@/app/ui/Pages/Commande/Summary/SummaryCard/SummaryCard";
import shippingFunction from "@/app/utils/shippingFunction/shippingFunction";

export default function Summary() {
  const [productCart, setProductCart] = useState([]);
  const [shippingPrice, setShippingPrice] = useState(0);
  useEffect(() => {
    const fetchData = async function () {
      await fetch("http://localhost:3001/api/user/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
        },
      })
        .then((response) => {
          response.json().then((data) => {
            setProductCart(data);
            setShippingPrice(shippingFunction(data));
          });
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);
  console.log(shippingPrice)
  return (
    <article className="commandeSummary">
      <h2>Récapitulatif du panier</h2>
      {productCart.map((produit) => (
        <SummaryCard key={`${produit._id}`} product={produit} />
      ))}
      <div className="commandeSummaryTotalWrapper">
        <p className="commandeSummaryTotal">
          Total :{" "}
          {(
            productCart.reduce((total, produit) => total + produit.price, 0) /
            100
          ).toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
          })}
        </p>
      </div>
    </article>
  );
}
