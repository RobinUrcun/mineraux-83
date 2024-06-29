"use client";

import React from "react";
import MondialRelayWidget from "./MondialRelayWidget/MondialRelayWidget";
import { useContext } from "react";
import { CommandeContext } from "@/app/utils/context/commandeContextProvider";

export default function MondialRelay() {
  const { commandeInfo, setCommandeInfo } = useContext(CommandeContext);
  return (
    <article className="commandeMondialRelay">
      <h2>Livraison à en point relay</h2>

      <div className="commandeMondialRelayWrapper">
        <div
          className="
commandeMondialrelayInfo"
        >
          <label htmlFor="surname">Nom : </label>
          <input
            value={commandeInfo.userSurname}
            id="surname"
            type="text"
            onChange={(e) => {
              setCommandeInfo({ ...commandeInfo, userSurname: e.target.value });
            }}
            autoComplete="family-name"
          />
          <label htmlFor="name">Prénom : </label>
          <input
            value={commandeInfo.userName}
            id="name"
            type="text"
            onChange={(e) => {
              setCommandeInfo({ ...commandeInfo, userName: e.target.value });
            }}
            autoComplete="given-name"
          />
          <label htmlFor="phone">Téléphone (pour la livraison) : </label>
          <input
            value={commandeInfo.phone}
            id="phone"
            type="tel"
            onChange={(e) => {
              setCommandeInfo({ ...commandeInfo, phone: e.target.value });
            }}
            autoComplete="tel"
          />
        </div>
        <MondialRelayWidget />
      </div>
    </article>
  );
}
