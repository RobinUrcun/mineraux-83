import React from "react";
import MondialRelayWidget from "./MondialRelayWidget/MondialRelayWidget";
import { useContext } from "react";
import { CommandeContext } from "@/app/utils/context/commandeContextProvider";

export default function Address() {
  const { commandeInfo, setCommandeInfo } = useContext(CommandeContext);
  console.log(commandeInfo);
  return (
    <article className="commandeAddress">
      <h2>Informations de livraison</h2>
      <div className="commandeAddressWrapper">
        <label htmlFor="surname">Nom : </label>
        <input
          id="surname"
          type="text"
          onChange={(e) => {
            setCommandeInfo({ ...commandeInfo, userSurname: e.target.value });
            console.log(commandeInfo);
          }}
        />
        <label htmlFor="name">Prénom : </label>
        <input
          id="name"
          type="text"
          onChange={(e) => {
            setCommandeInfo({ ...commandeInfo, userName: e.target.value });
            console.log(commandeInfo);
          }}
        />
      </div>
      <MondialRelayWidget />
    </article>
  );
}
