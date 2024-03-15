import React from "react";
import Image from "next/image";

export default function Cart() {
  return (
    <div className="cartWrapper">
      <div className="cartProductWrapper">
        <Image
          src="/assets/geode2.png"
          width={150}
          height={150}
          alt="Votre produit"
        />
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
        <div className="cartPrice">Prix : 60.00€</div>
      </div>
    </div>
  );
}
