import React from "react";
import Button from "@/app/ui/Components/Button/Button";
import AddressResume from "./AddressResume/AddressResume";
import { useContext } from "react";
import { CommandeContext } from "@/app/utils/context/commandeContextProvider";
import Paypal from "@/app/ui/Components/Paypal/Paypal";

export default function CommandeResume() {
  const { deliveryInfo } = useContext(CommandeContext);
  console.log(deliveryInfo.deliveryCompany);
  return (
    <React.Fragment>
      {deliveryInfo.deliveryCompany === "" ? null : (
        <article className="commandeResume">
          <div className="addressResume">
            <h2>Adresse de livraison</h2>

            <AddressResume />
          </div>
          <div className="paiement">
            <Paypal />
          </div>
        </article>
      )}
    </React.Fragment>
  );
}
