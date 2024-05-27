import React from "react";
import Button from "@/app/ui/Components/Button/Button";
import AddressResume from "./AddressResume/AddressResume";

export default function CommandeResume() {
  return (
    <article className="commandeResume">
      <div className="addressResume">
        <h2>Adresse de livraison</h2>

        <AddressResume />
      </div>
      <div className="paiement">
        <Button>Payer</Button>
      </div>
    </article>
  );
}
