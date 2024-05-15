import React from "react";
import Image from "next/image";

export default function FilterSection({ filter, setFilter }) {
  return (
    <div className="boutiqueFilter">
      <label htmlFor="filterSelect">Trier par :</label>
      <select
        name="filterSelect"
        id="filterSelect"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      >
        <option value="new">Nouveauté</option>

        <option value="ascending">Prix Croissant</option>
        <option value="decreasing">Prix Décroissant</option>
      </select>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="search"
          onChange={(e) => {
            console.log(e.target.value);
            if (!e.target.value) {
              setFilter("new");
            } else {
              setFilter(e.target.value);
            }
          }}
        />
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
