import mr_belgique_priceList from "@/app/utils/priceList/mondialRelay/belgique/mr_belgique_priceList";
import mr_luxembourg_priceList from "@/app/utils/priceList/mondialRelay/luxembourg/mr_luxembourg_priceList";
import mr_paysBas_priceList from "@/app/utils/priceList/mondialRelay/pays-bas/mr_pays-bas_priceList";
import mr_espagne_priceList from "@/app/utils/priceList/mondialRelay/espagne/mr_espagne_priceList";
import mr_portugal_priceList from "@/app/utils/priceList/mondialRelay/portugal/mr_portugal_priceList";
export default function shippingFunctionMR(cartList, countryToSend) {
  console.log(countryToSend);
  const priceLists = {
    BE: mr_belgique_priceList,
    LU: mr_luxembourg_priceList,
    NL: mr_paysBas_priceList,
    ES: mr_espagne_priceList,
    PT: mr_portugal_priceList,
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
