"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const [order, setOrder] = useState();
  const params = useParams();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Les mois commencent à 0, donc on ajoute 1
    const year = date.getFullYear();

    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  useEffect(() => {
    fetch(`https://mineraux83-api.vercel.app/api/user/order/${params.id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
      },
    })
      .then((response) => {
        response.json().then((data) => {
          setOrder(data.data[0]);
        });
      })
      .catch((err) => console.log(err));
  }, []);
  if (order) {
    return (
      <article className="orderInfoArticle">
        <h2> Commande n° : {order.orderID}</h2>
        <div className="orderInfoWrapper">
          <div className="orderInfoClient">
            <h3>Infos client</h3>
            <div className="orderInfoClientWrapper">
              <p> Nom : </p>
              <p>{order.userSurname}</p>
            </div>
            <div className="orderInfoClientWrapper">
              <p> Prénom : </p>
              <p>{order.userName}</p>
            </div>
            <div className="orderInfoClientWrapper">
              <p> Email : </p>
              <p>{order.userEmail}</p>
            </div>
          </div>
          <div className="orderInfoDelivery">
            <h3>Infos livraison</h3>
            <div className="orderInfoDeliveryWrapper">
              <p> Nom de livraison : </p>
              <p>{order.deliverySurname}</p>
            </div>
            <div className="orderInfoDeliveryWrapper">
              <p> Prénom de livraison : </p>
              <p>{order.deliveryName}</p>
            </div>
            <div className="orderInfoDeliveryWrapper">
              <p> Téléphone : </p>
              <p>{order.phone}</p>
            </div>
            <div className="orderInfoDeliveryWrapper">
              <p> Email : </p>
              <p>{order.userEmail}</p>
            </div>
            <div className="orderInfoDeliveryWrapper">
              <p> Date de commande : </p>
              <p>{formatDate(parseInt(order.date))}</p>
            </div>
            <div className="orderInfoDeliveryWrapper">
              <p> Type de livraison : </p>
              <p>{order.deliveryCompany}</p>
            </div>
            {order.deliveryCompany === "MR" ? (
              <div className="orderInfoDeliveryWrapper">
                <p> Nom du Point Relay : </p>
                <p>{order.deliveryShopName}</p>
              </div>
            ) : null}
            <div className="orderInfoDeliveryWrapper">
              <p> Route : </p>
              <p>{order.deliveryRoad}</p>
            </div>
            <div className="orderInfoDeliveryWrapper">
              <p> Ville : </p>
              <p>{order.deliveryCity}</p>
            </div>
            <div className="orderInfoDeliveryWrapper">
              <p> Code Postal : </p>
              <p>{order.deliveryCP}</p>
            </div>
            <div className="orderInfoDeliveryWrapper">
              <p> Pays : </p>
              <p>{order.deliveryCountry}</p>
            </div>
            <div className="orderInfoDeliveryWrapper">
              <p>Panier : </p>
              <p className="orderInfoTable">
                <thead>
                  <tr>
                    <th scope="col">Produit</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Ref</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((produit) => (
                    <tr>
                      <td>{produit.title}</td>
                      <td>
                        {(produit.price / 100).toLocaleString("fr-FR", {
                          style: "currency",
                          currency: "EUR",
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td>{produit.reference}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>Total :</td>
                    <td>
                      {parseFloat(order.total / 100).toLocaleString("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                </tbody>
              </p>
            </div>
          </div>
        </div>
      </article>
    );
  }
}
