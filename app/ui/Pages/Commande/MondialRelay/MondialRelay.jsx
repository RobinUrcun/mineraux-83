"use client";

import React from "react";
import MondialRelayWidget from "./MondialRelayWidget/MondialRelayWidget";
import { useContext } from "react";
import { CommandeContext } from "@/app/utils/context/commandeContextProvider";
import { validName, validNumber } from "@/app/utils/regex/regex";
import InputMessage from "@/app/ui/Components/InputMessage/InputMessage";

export default function MondialRelay() {
  const { commandeInfo, setCommandeInfo } = useContext(CommandeContext);
  return (
    <article className="commandeMondialRelay">
      <h2>Livraison en point relay</h2>

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
            className={
              commandeInfo.userSurname == ""
                ? null
                : validName.test(commandeInfo.userSurname)
                ? null
                : "errorInput"
            }
          />
          <InputMessage
            classNames={
              commandeInfo.userSurname === ""
                ? false
                : validName.test(commandeInfo.userSurname)
                ? false
                : true
            }
          >
            Votre nom ne peut contenir que des lettres !
          </InputMessage>
          <label htmlFor="name">Prénom : </label>
          <input
            value={commandeInfo.userName}
            id="name"
            type="text"
            onChange={(e) => {
              setCommandeInfo({ ...commandeInfo, userName: e.target.value });
            }}
            autoComplete="given-name"
            className={
              commandeInfo.userName == ""
                ? null
                : validName.test(commandeInfo.userName)
                ? null
                : "errorInput"
            }
          />
          <InputMessage
            classNames={
              commandeInfo.userName === ""
                ? false
                : validName.test(commandeInfo.userName)
                ? false
                : true
            }
          >
            Votre prénom ne peut contenir que des lettres !
          </InputMessage>
          <label htmlFor="phone">Téléphone (pour la livraison) : </label>
          <input
            value={commandeInfo.phone}
            id="phone"
            type="tel"
            onChange={(e) => {
              setCommandeInfo({ ...commandeInfo, phone: e.target.value });
            }}
            autoComplete="tel"
            className={
              commandeInfo.phone == ""
                ? null
                : validNumber.test(commandeInfo.phone)
                ? null
                : "errorInput"
            }
          />
          <InputMessage
            classNames={
              commandeInfo.phone === ""
                ? false
                : validNumber.test(commandeInfo.phone)
                ? false
                : true
            }
          >
            Votre numéro de téléphone ne peut contenir que des chiffres !
          </InputMessage>
        </div>
        <MondialRelayWidget />
      </div>
    </article>
  );
}
