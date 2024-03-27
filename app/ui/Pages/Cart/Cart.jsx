import React from "react";
import Image from "next/image";

export default function Cart({ product }) {
  console.log(product);
  return (
    <div className="cartWrapper">
      <div className="cartProductWrapper">
        <div className="cartProductImgWrapper">
          <img src={product.image} alt="Votre produit" />
        </div>
        <h3>{product.title}</h3>
      </div>
      <div className="QtyAndPrice">
        <div className="cartQty">
          <div>
            <label htmlFor="quantity">Quantité :</label>
            <select>
              <option value="1">1</option>
            </select>
          </div>
          <div className="removeItem">Supprimer</div>
        </div>
        <div className="cartPrice">
          Prix :
          {(product.price / 100).toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
          })}
        </div>
      </div>
    </div>
  );
}
