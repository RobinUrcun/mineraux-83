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
      <script
        src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"
        async
      ></script>

      <script
        type="text/javascript"
        src="//unpkg.com/leaflet/dist/leaflet.js"
        async
      ></script>
      <link
        rel="stylesheet"
        type="text/css"
        href="//unpkg.com/leaflet/dist/leaflet.css"
      />

      <script
        type="text/javascript"
        src="https://widget.mondialrelay.com/parcelshop-picker/jquery.plugin.mondialrelay.parcelshoppicker.min.js"
        async
      ></script>
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
