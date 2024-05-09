"use client";

import React from "react";
import Link from "next/link";
import { useContext } from "react";
import { CommandeContext } from "@/app/utils/context/commandeContextProvider";

export default function DeliveryChoice() {
  const { commandeInfo, setCommandeInfo } = useContext(CommandeContext);
  return (
    <article className="deliveryArticle">
      <h2>Choisissez votre mode de livraison :</h2>
      <div className="deliveryChoiceWrapper">
        <Link
          href={"/commande/deliveryChronopost"}
          onClick={() => {
            setCommandeInfo({
              ...commandeInfo,
              delivery: {
                name: undefined,
                road: undefined,
                CP: undefined,
                city: undefined,
                country: undefined,
                id: undefined,
              },
            });
          }}
        >
          Livraison à domicile
        </Link>
        <Link
          href={"/commande/deliveryMondialRelay"}
          onClick={() => {
            setCommandeInfo({
              ...commandeInfo,
              delivery: {
                name: undefined,
                road: undefined,
                CP: undefined,
                city: undefined,
                country: undefined,
                id: undefined,
              },
            });
          }}
        >
          Livraison en point relay
        </Link>
      </div>
    </article>
  );
}
