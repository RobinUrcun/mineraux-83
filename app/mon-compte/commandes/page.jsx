"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import OrderDisplayClient from "@/app/ui/Components/OrdersDisplay/OrderDisplayClient";

export default function page() {
  const router = useRouter();
  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    fetch(`https://mineraux83-api.vercel.app/api/user/getClientOrders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        response
          .json()
          .then((data) => {
            console.log(data.orderList);
            setOrdersList(data.orderList);
          })
          .catch((err) => router.push("/erreur"));
      } else if (response.status === 401) {
        setUserInfo({
          isUserConnected: null,
          userRole: null,
        });
        localStorage.removeItem("userInfoToken");
        localStorage.removeItem("userInfoUserId");
        localStorage.removeItem("userInfoRole");
        router.push("/login");
      } else {
        router.push("/erreur");
      }
    });
  }, []);

  console.log(ordersList);
  return (
    <article className="monCompteCommandes">
      <h2>Mes Commandes</h2>
      <table className="ordersDisplay orderDisplayClient">
        <thead>
          <tr>
            <th scope="col">Numéro de commande</th>
            <th scope="col">Produit(s)</th>
            <th scope="col">Montant</th>
          </tr>
        </thead>
        <tbody>
          {ordersList.map((order) => (
            <OrderDisplayClient
              key={order.orderID}
              orderDate={order.date}
              orderId={order.orderID}
              productList={order.products}
              total={order.total}
            />
          ))}
        </tbody>
      </table>
    </article>
  );
}
