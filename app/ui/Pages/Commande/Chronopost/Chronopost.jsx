"use client";
import React from "react";
import { useContext } from "react";
import { CommandeContext } from "@/app/utils/context/commandeContextProvider";
import {
  validNumber,
  validName,
  validRoadName,
  validPostalCode,
} from "@/app/utils/regex/regex";
import InputMessage from "@/app/ui/Components/InputMessage/InputMessage";
export default function Chronopost() {
  const { commandeInfo, setCommandeInfo, deliveryInfo, setDeliveryInfo } =
    useContext(CommandeContext);
  return (
    <article className="commandeChronopost">
      <h2>Livraison à domicile</h2>
      <div
        className="
commandeChronopostInfo"
      >
        <div className="commandeChronoposInfoWrapper">
          <div className="commandeInputLabelWrapper">
            <label htmlFor="surname">Nom : </label>
            <input
              value={commandeInfo.userSurname}
              id="surname"
              type="text"
              onChange={(e) => {
                setCommandeInfo({
                  ...commandeInfo,
                  userSurname: e.target.value,
                });
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
          </div>
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
          <div className="commandeInputLabelWrapper">
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
          </div>
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
          <div className="commandeInputLabelWrapper">
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
          </div>
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
        <div className="commandeChronopostAddressWrapper">
          <div className="commandeInputLabelWrapper">
            <label htmlFor="road">Adresse : </label>
            <input
              id="road"
              type="text"
              onChange={(e) => {
                setDeliveryInfo({
                  ...deliveryInfo,
                  road: e.target.value,
                });
              }}
              autoComplete="address-line1"
              className={
                deliveryInfo.road == ""
                  ? null
                  : validRoadName.test(deliveryInfo.road)
                  ? null
                  : "errorInput"
              }
            />
          </div>
          <InputMessage
            classNames={
              deliveryInfo.road === ""
                ? false
                : validRoadName.test(deliveryInfo.road)
                ? false
                : true
            }
          >
            Format de l'addresse incorrect !
          </InputMessage>
          <div className="commandeCityCPWrapper">
            <div className="commandeInputLabelWrapper">
              <label htmlFor="CP">Code Postal : </label>
              <input
                id="CP"
                type="text"
                onChange={(e) => {
                  setDeliveryInfo({
                    ...deliveryInfo,
                    CP: e.target.value,
                  });
                }}
                autoComplete="postal-code"
                className={
                  deliveryInfo.CP == ""
                    ? null
                    : validPostalCode.test(deliveryInfo.CP)
                    ? null
                    : "errorInput"
                }
              />
            </div>

            <div className="commandeInputLabelWrapper">
              <label htmlFor="city">Ville : </label>
              <input
                id="city"
                type="text"
                onChange={(e) => {
                  setDeliveryInfo({
                    ...deliveryInfo,
                    city: e.target.value,
                  });
                }}
                autoComplete="address-level2"
              />
            </div>
          </div>
          <div className="commandeInputLabelWrapper">
            <label htmlFor="country">Pays : </label>
            <select
              name="country"
              id="country"
              onChange={(e) => {
                const selectedValue = e.target.value || undefined;
                setDeliveryInfo({
                  ...deliveryInfo,
                  country: selectedValue,
                });
              }}
              autoComplete="country"
            >
              <option value={""}>Choisissez un pays</option>
              <option value="FR">France</option>
              <option value="DE">Allemagne</option>
              <option value="AT">Autriche</option>
              <option value="BE">Belgique</option>
              <option value="BG">Bulgarie</option>
              <option value="CY">Chypre</option>
              <option value="HR">Croatie</option>
              <option value="DK">Danemark</option>
              <option value="ES">Espagne</option>
              <option value="EE">Estonie</option>
              <option value="FI">Finlande</option>
              <option value="FR">France</option>
              <option value="GR">Grèce</option>
              <option value="HU">Hongrie</option>
              <option value="IE">Irlande</option>
              <option value="IT">Italie</option>
              <option value="LV">Lettonie</option>
              <option value="LT">Lituanie</option>
              <option value="LU">Luxembourg</option>
              <option value="MT">Malte</option>
              <option value="NL">Pays-Bas</option>
              <option value="PL">Pologne</option>
              <option value="PT">Portugal</option>
              <option value="RO">Roumanie</option>
              <option value="GB">Royaume-Uni</option>
              <option value="SK">Slovaquie</option>
              <option value="SI">Slovénie</option>
              <option value="SE">Suède</option>
            </select>
          </div>
        </div>
      </div>
    </article>
  );
}
