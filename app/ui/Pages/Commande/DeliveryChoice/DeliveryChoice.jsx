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
          href={"/commande/deliveryChronopost"}
          onClick={() => {
            setDeliveryInfo({
              name: "",
              road: "",
              CP: "",
              city: "",
              country: "",
              deliveryCompany: "CP",
            });
          }}
        >
          Livraison à domicile
        </Link>
        <Link
          href={"/commande/deliveryMondialRelay"}
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
