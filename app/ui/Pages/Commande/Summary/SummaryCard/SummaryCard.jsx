import React from "react";

export default function SummaryCard({ product }) {
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
