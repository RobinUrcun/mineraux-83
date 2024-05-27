"use client";

import React from "react";
import { useState, useEffect, useContext } from "react";
import SummaryCard from "@/app/ui/Pages/Commande/Summary/SummaryCard/SummaryCard";
import shippingFunction from "@/app/utils/shippingFunction/shippingFunction";
import { CommandeContext } from "@/app/utils/context/commandeContextProvider";

export default function Summary() {
  const { deliveryInfo } = useContext(CommandeContext);

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
          });
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);
  useEffect(() => {
    const cartPrice =
      productCart.reduce((total, produit) => total + produit.price, 0) / 100;
    if (cartPrice < 80) {
      if (productCart.length > 0 && deliveryInfo.country) {
        console.log(deliveryInfo.country);
        const price = shippingFunction(productCart, deliveryInfo.country);
        setShippingPrice(price);
      }
    } else {
      setShippingPrice("offerts");
    }
  }, [productCart, deliveryInfo.country]);
  console.log(shippingPrice);
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
        <p className="commandeSummaryShippingPriceTotal">
          + frais de port : {shippingPrice}
        </p>
      </div>
    </article>
  );
}
