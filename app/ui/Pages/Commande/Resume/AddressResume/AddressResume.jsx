import React from "react";

export default function AddressResume({ commandeInfo }) {
  return (
    <div className="adressResumeWrapper">
      <div className="addressResumeNames">
        <p>{commandeInfo.userSurname}</p>
        <p>{commandeInfo.userName}</p>
      </div>

      <p>{commandeInfo.delivery.name}</p>
      <p>{commandeInfo.delivery.road}</p>
      <div className="addressResumeCity">
        <p>{commandeInfo.delivery.CP}</p>
        <p>{commandeInfo.delivery.city}</p>
        <p>{commandeInfo.delivery.country}</p>
      </div>
    </div>
  );
}
