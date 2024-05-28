import cm_france_pricelist from "@/app/utils/priceList/colissimo/france/cm_france_priceList";
import cm_europe_priceList from "@/app/utils/priceList/colissimo/europe/cm_europe_priceList";
export default function shippingFunctionCM(cartList, countryToSend) {
  console.log(countryToSend);
  const priceLists = {
    FR: cm_france_pricelist,
    DE: cm_europe_priceList,
    AT: cm_europe_priceList,
    BE: cm_europe_priceList,
    BG: cm_europe_priceList,
    CY: cm_europe_priceList,
    HR: cm_europe_priceList,
    DK: cm_europe_priceList,
    ES: cm_europe_priceList,
    EE: cm_europe_priceList,
    FI: cm_europe_priceList,
    GR: cm_europe_priceList,
    HU: cm_europe_priceList,
    IE: cm_europe_priceList,
    IT: cm_europe_priceList,
    LV: cm_europe_priceList,
    LT: cm_europe_priceList,
    LU: cm_europe_priceList,
    MT: cm_europe_priceList,
    NL: cm_europe_priceList,
    PL: cm_europe_priceList,
    PT: cm_europe_priceList,
    RO: cm_europe_priceList,
    GB: cm_europe_priceList,
    SK: cm_europe_priceList,
    SI: cm_europe_priceList,
    SE: cm_europe_priceList,
  };
  let totalWeight = 0;

  for (let i = 0; i < cartList.length; i++) {
    const newTotalWeight = totalWeight + cartList[i].weight;
    totalWeight = newTotalWeight;
  }
  const selectedCountry = priceLists[countryToSend];
  const tranche = selectedCountry.tarif.find(
    (tranche) => totalWeight <= tranche.maxWeight
  );

  const price = (tranche.price / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });
  return price;
}
