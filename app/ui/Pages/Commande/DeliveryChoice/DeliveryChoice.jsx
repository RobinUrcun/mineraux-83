"use client";

import React from "react";
import Link from "next/link";
import { useContext } from "react";
import { CommandeContext } from "@/app/utils/context/commandeContextProvider";

export default function DeliveryChoice() {
  const { deliveryInfo, setDeliveryInfo } = useContext(CommandeContext);
  return (
    <article className="deliveryArticle">
      <h2>Choisissez votre mode de livraison :</h2>
      <div className="deliveryChoiceWrapper">
        <Link
          className={
            deliveryInfo.deliveryCompany === "CM" ? "selectDelivery" : null
          }
          href={"/commande/deliveryChronopost"}
          onClick={() => {
            setDeliveryInfo({
              name: "",
              road: "",
              CP: "",
              city: "",
              country: "",
              deliveryCompany: "CM",
            });
          }}
        >
          Livraison à domicile
        </Link>
        <Link
          href={"/commande/deliveryMondialRelay"}
          className={
            deliveryInfo.deliveryCompany === "MR" ? "selectDelivery" : null
          }
          onClick={() => {
            setDeliveryInfo({
              name: "",
              road: "",
              CP: "",
              city: "",
              country: "",
              deliveryCompany: "MR",
            });
          }}
        >
          Livraison en point relay
        </Link>
      </div>
    </article>
  );
}
