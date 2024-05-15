import mr_france_priceliste from "@/app/utils/priceList/mondialRelay/france/mr_france_priceliste.json";

export default function shippingFunction(cartList) {
  console.log(cartList);
  let totalWeight = 0;

  for (let i = 0; i < cartList.length; i++) {
    const newTotalWeight = totalWeight + cartList[i].weight;
    totalWeight = newTotalWeight;
  }
  const tranche = mr_france_priceliste.find(
    (tranche) => totalWeight <= tranche.maxWeight
  );

  return tranche.price;
}
