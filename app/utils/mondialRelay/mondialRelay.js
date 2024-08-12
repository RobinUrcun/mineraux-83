export const MondialWidget = (StateToSet, State) => {
  function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = callback;
    script.async = true;
    document.head.appendChild(script);
  }
  // Charger jQuery en premier
  loadScript("https://code.jquery.com/jquery-3.7.1.min.js", () => {
    // Charger le plugin Mondial Relay après que jQuery est chargé
    loadScript(
      "https://widget.mondialrelay.com/parcelshop-picker/jquery.plugin.mondialrelay.parcelshoppicker.min.js",
      () => {
        // Charger Leaflet.js
        loadScript("https://unpkg.com/leaflet/dist/leaflet.js", () => {
          // Initialiser le widget après le chargement de tous les scripts
          $(document).ready(function () {
            $("#Zone_Widget").MR_ParcelShopPicker({
              TargetDisplayInfoPR: "#Retour_Widget",
              Brand: "CC2357KU",
              Country: "FR",
              PostCode: "59000",
              ColLivMod: "24R",
              NbResults: "7",
              OnParcelShopSelected: (data) => {
                StateToSet({
                  name: data.Nom,
                  road: data.Adresse1,
                  CP: data.CP,
                  city: data.Ville,
                  country: data.Pays,
                  id: data.ID,
                  deliveryCompany: "MR",
                });
              },
              AllowedCountries: "FR,BE,LU,ES,NL,PT",
              Responsive: true,
              ShowResultsOnMap: true,
            });
          });
        });
      }
    );
  });
};
