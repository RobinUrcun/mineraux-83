"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OrderDisplayAdmin from "@/app/ui/Components/OrdersDisplay/OrderDisplayAdmin";

export default function page() {
  const router = useRouter();

  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/user/getAllOrders`, {
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
  return (
    <article className="venteProduct">
      <h2>Mes ventes</h2>
      <table className="ordersDisplay">
        <thead>
          <tr>
            <th scope="col">Numéro de commande</th>
            <th scope="col">Produit(s)</th>
            <th scope="col">Montant</th>
          </tr>
        </thead>
        <tbody>
          {ordersList.map((order) => (
            <OrderDisplayAdmin
              key={order.orderID}
              orderId={order.orderID}
              date={order.date}
              productList={order.products}
              total={order.total}
            />
          ))}
        </tbody>
      </table>
    </article>
  );
}
