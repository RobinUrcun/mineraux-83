import React from "react";
import { useContext } from "react";
import { CommandeContext } from "@/app/utils/context/commandeContextProvider";

export default function AddressResume() {
  const { commandeInfo, deliveryInfo } = useContext(CommandeContext);
  return (
    <div className="adressResumeWrapper">
      <div className="addressResumeNames">
        <p>{commandeInfo.userSurname}</p>
        <p>{commandeInfo.userName}</p>
      </div>

      <p>{deliveryInfo.name}</p>
      <p>{deliveryInfo.road}</p>
      <div className="addressResumeCity">
        <p>{deliveryInfo.CP}</p>
        <p>{deliveryInfo.city}</p>
        <p>{deliveryInfo.country}</p>
      </div>
    </div>
  );
}
