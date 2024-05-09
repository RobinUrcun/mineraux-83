"use client";

import React from "react";
import Head1 from "../ui/Components/head1/Head1";
import Summary from "../ui/Pages/Commande/Summary/Summary";

import CommandeContextProvider from "../utils/context/commandeContextProvider";
import CommandeResume from "../ui/Pages/Commande/Resume/CommandeResume";
import DeliveryChoice from "../ui/Pages/Commande/DeliveryChoice/DeliveryChoice";

export default function layout({ children }) {
  return (
    <React.Fragment>
      <CommandeContextProvider>
        <Head1>Ma commande</Head1>

        <section className="commandeSection">
          <div className="commandeSummaryAddressWrapper">
            <Summary />
            <DeliveryChoice />
          </div>
          {children}
          <CommandeResume />
        </section>
      </CommandeContextProvider>
    </React.Fragment>
  );
}
