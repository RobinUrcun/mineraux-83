import React from "react";
import Link from "next/link";

export default function OrderDisplayAdmin({
  orderId,
  productList,
  total,
  date,
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
  return (
    <tr>
      <th scope="row">
        <Link href={`/admin/mes-ventes/${orderId}`}>{orderId}</Link>
        <p>{formatDate(parseInt(date))}</p>
      </th>
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
