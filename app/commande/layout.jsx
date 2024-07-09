"use client";

import React from "react";
import Head1 from "../ui/Components/head1/Head1";
import Summary from "../ui/Pages/Commande/Summary/Summary";
import ToastFailed from "../ui/Components/Toast/ToastFailed";

import CommandeContextProvider from "../utils/context/commandeContextProvider";
import CommandeResume from "../ui/Pages/Commande/Resume/CommandeResume";
import DeliveryChoice from "../ui/Pages/Commande/DeliveryChoice/DeliveryChoice";

export default function layout({ children }) {
  return (
    <React.Fragment>
      <Head1>Ma commande</Head1>
      <CommandeContextProvider>
        <section className="commandeSection">
          <div className="commandeSummaryAddressWrapper">
            <Summary />
            <DeliveryChoice />
          </div>
          {children}
          <CommandeResume />
        </section>
        <ToastFailed>Le paiement a échoué</ToastFailed>
      </CommandeContextProvider>
    </React.Fragment>
  );
}
