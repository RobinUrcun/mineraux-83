"use client";

import React from "react";
import { useState, useEffect, useContext } from "react";
import SummaryCard from "@/app/ui/Pages/Commande/Summary/SummaryCard/SummaryCard";
import shippingFunctionMR from "@/app/utils/shippingFunction/shippingFunctionMR";
import shippingFunctionCM from "@/app/utils/shippingFunction/shippingFunctionCM";
import { CommandeContext } from "@/app/utils/context/commandeContextProvider";
import { useRouter } from "next/navigation";

export default function Summary() {
  const router = useRouter();

  const { deliveryInfo } = useContext(CommandeContext);

  const [productCart, setProductCart] = useState([]);
  const [shippingPrice, setShippingPrice] = useState("? €");

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
          if (response.status === 200) {
            response.json().then((data) => {
              setProductCart(data);
            });
          } else if (response.status === 401) {
            setUserInfo({
              isUserConnected: null,
              userRole: null,
            });
            localStorage.removeItem("userInfoToken");
            localStorage.removeItem("userInfoUserId");
            localStorage.removeItem("userInfoRole");
            router.push("/login");
          } else {
            router.push("/erreur");
          }
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);
  useEffect(() => {
    const cartPrice =
      productCart.reduce((total, produit) => total + produit.price, 0) / 100;
    if (cartPrice < 80) {
      if (deliveryInfo.deliveryCompany === "MR") {
        if (deliveryInfo.country) {
          const price = shippingFunctionMR(productCart, deliveryInfo.country);
          setShippingPrice(price);
        } else {
          setShippingPrice("? €");
        }
      } else if (deliveryInfo.deliveryCompany === "CM") {
        if (deliveryInfo.country) {
          const price = shippingFunctionCM(productCart, deliveryInfo.country);
          setShippingPrice(price);
        } else {
          setShippingPrice("? €");
        }
      } else {
        setShippingPrice("? €");
      }
    } else {
      setShippingPrice("offerts");
    }
  }, [productCart, deliveryInfo]);
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
