import React from "react";
import { useContext } from "react";
import { CommandeContext } from "@/app/utils/context/commandeContextProvider";
import Button from "@/app/ui/Components/Button/Button";
import AdressResume from "./AdressResume/AdressResume";

export default function CommandeResume() {
  const { commandeInfo, setCommandeInfo } = useContext(CommandeContext);
  return (
    <article className="commandeResume">
      <div className="addressResume">
        <h2>Adresse de livraison</h2>

        {!commandeInfo.delivery ? null : (
          <AdressResume commandeInfo={commandeInfo} />
        )}
      </div>
      <div className="paiement">
        <Button>Payer</Button>
      </div>
    </article>
  );
}
