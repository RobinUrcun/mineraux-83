import React from "react";

export default function FilterSection() {
  return (
    <div className="boutiqueFilter">
      <label htmlFor="filterSelect">Trier par :</label>
      <select name="filterSelect" id="filterSelect">
        <option value="popularité">Popularité</option>

        <option value="croissant">Prix Croissant</option>
        <option value="décroissant">Prix Décroissant</option>
      </select>
    </div>
  );
}
