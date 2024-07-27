import React from "react";
import MondialRelay from "@/app/ui/Pages/Commande/MondialRelay/MondialRelay";

export default function page() {
  return (
    <React.Fragment>
      <MondialRelay />
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
    </React.Fragment>
  );
}
