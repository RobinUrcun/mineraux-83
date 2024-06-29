import React from "react";

export default function OrderDisplayClient({
  orderId,
  productList,
  total,
  orderDate,
}) {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Les mois commencent à 0, donc on ajoute 1
    const year = date.getFullYear();

    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  console.log(orderDate);
  return (
    <tr>
      <td scope="row">
        <span>{orderId}</span> <span>{formatDate(parseInt(orderDate))}</span>
      </td>
      <td>
        {productList.map((product, index) => (
          <p className="orderProductList" key={`${product.title} ${index}`}>
            {product.title} :{" "}
            {(product.price / 100).toLocaleString("fr-FR", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
            })}
          </p>
        ))}
      </td>
      <td>
        {(total / 100).toLocaleString("fr-FR", {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 2,
        })}
      </td>
    </tr>
  );
}
