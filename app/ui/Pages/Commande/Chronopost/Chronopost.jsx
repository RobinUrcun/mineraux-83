"use client";
import React from "react";
import { useContext } from "react";
import { CommandeContext } from "@/app/utils/context/commandeContextProvider";

export default function Chronopost() {
  const { commandeInfo, setCommandeInfo } = useContext(CommandeContext);
  return (
    <article className="commandeChronopost">
      <h2>Livraison à domicile</h2>
      <div
        className="
commandeChronopostInfo"
      >
        <div className="commandeChronoposInfoWrapper">
          <label htmlFor="surname">Nom : </label>
          <input
            value={commandeInfo.userSurname}
            id="surname"
            type="text"
            onChange={(e) => {
              setCommandeInfo({ ...commandeInfo, userSurname: e.target.value });
            }}
          />
          <label htmlFor="name">Prénom : </label>
          <input
            value={commandeInfo.userName}
            id="name"
            type="text"
            onChange={(e) => {
              setCommandeInfo({ ...commandeInfo, userName: e.target.value });
            }}
          />
          <label htmlFor="surname">Téléphone (pour la livraison) : </label>
          <input
            value={commandeInfo.phone}
            id="phone"
            type="tel"
            onChange={(e) => {
              setCommandeInfo({ ...commandeInfo, phone: e.target.value });
            }}
          />
        </div>
        <div className="commandeChronopostAddressWrapper">
          <label htmlFor="road">Adresse : </label>
          <input
            id="road"
            type="text"
            onChange={(e) => {
              setCommandeInfo({
                ...commandeInfo,
                delivery: { ...commandeInfo.delivery, road: e.target.value },
              });
            }}
          />
          <label htmlFor="CP">Code Postal : </label>
          <input
            id="CP"
            type="number"
            onChange={(e) => {
              setCommandeInfo({
                ...commandeInfo,
                delivery: { ...commandeInfo.delivery, CP: e.target.value },
              });
            }}
          />
          <label htmlFor="city">Ville : </label>
          <input
            id="city"
            type="text"
            onChange={(e) => {
              setCommandeInfo({
                ...commandeInfo,
                delivery: { ...commandeInfo.delivery, city: e.target.value },
              });
            }}
          />
          <label htmlFor="country">Pays : </label>
          <select
            name="country"
            id="country"
            onChange={(e) => {
              setCommandeInfo({
                ...commandeInfo,
                delivery: { ...commandeInfo.delivery, country: e.target.value },
              });
            }}
          >
            <option value={undefined}>Choisissez un pays</option>
            <option value="France">France</option>
            <option value="Belgique">Belgique</option>
            <option value="Allemagne">Allemagne</option>
          </select>
        </div>
      </div>
    </article>
  );
}
