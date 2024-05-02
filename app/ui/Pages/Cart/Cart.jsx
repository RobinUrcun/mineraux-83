import React from "react";
import { removeFromCart } from "@/app/utils/cart/removeFromCart";

export default function Cart({ product, userInfo, onRemove }) {
  return (
    <div className="cartWrapper">
      <div className="cartProductWrapper">
        <div className="cartProductImgWrapper">
          <img
            src={`https://lithosphere83-bucket.s3.eu-west-3.amazonaws.com/upload/${product.mainFile[0]}`}
            alt="Votre produit"
          />
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
          <div
            onClick={() => {
              removeFromCart(product._id, userInfo);
              onRemove(product._id);
            }}
            className="removeItem"
          >
            Supprimer
          </div>
        </div>
        <div className="cartPrice">
          Prix :{" "}
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
