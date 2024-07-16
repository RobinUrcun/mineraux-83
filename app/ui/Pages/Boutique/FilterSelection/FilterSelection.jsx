import React from "react";
import Image from "next/image";

export default function FilterSelection({ products, setProducts }) {
  return (
    <div className="boutiqueFilter">
      <label htmlFor="filterSelect">Trier par :</label>
      <select
        name="filterSelect"
        id="filterSelect"
        onChange={(e) => {
          setProducts({ ...products, sort: e.target.value });
        }}
      >
        <option value="new">Nouveauté</option>

        <option value="ascending">Prix Croissant</option>
        <option value="decreasing">Prix Décroissant</option>
      </select>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setProducts({ ...products, filter: e.target.value });
        }}
      >
        <input type="search" />
        <button>
          <Image
            src={"/form/logoSearch.png"}
            height={20}
            width={20}
            alt="rechercher"
          />
        </button>
      </form>
    </div>
  );
}
