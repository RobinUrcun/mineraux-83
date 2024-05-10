import React from "react";

export default function FilterSection({ products, setProducts }) {
  return (
    <div className="boutiqueFilter">
      <label htmlFor="filterSelect">Trier par :</label>
      <select
        name="filterSelect"
        id="filterSelect"
        // onChange={(e) => {
        //   if (e.target.value === "new") {
        //     setProducts(products);
        //   } else if (e.target.value === "ascending") {
        //     const newProductList = products.sort((a, b) => a.price - b.price);
        //     setProducts(newProductList);
        //     console.log("test");
        //   }
        // }}
      >
        <option value="new">Nouveauté</option>

        <option value="ascending">Prix Croissant</option>
        <option value="decreasing">Prix Décroissant</option>
      </select>
    </div>
  );
}
