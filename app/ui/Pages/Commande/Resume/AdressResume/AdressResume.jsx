import React from "react";

export default function AdressResume({ commandeInfo }) {
  return (
    <div className="adressResumeWrapper">
      <div className="adressResumeNames">
        <p>{commandeInfo.userSurname}</p>
        <p>{commandeInfo.userName}</p>
      </div>
      <p>{commandeInfo.delivery.name}</p>
      <p>{commandeInfo.delivery.adress}</p>
      <div className="adressResumeCity">
        <p>{commandeInfo.delivery.CP}</p>
        <p>{commandeInfo.delivery.city}</p>
        <p>{commandeInfo.delivery.country}</p>
      </div>
    </div>
  );
}
