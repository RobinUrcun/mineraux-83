import React from "react";
import stoneCategories from "@/app/utils/shopCategories/stonesCategories.json";
import jewelCategories from "@/app/utils/shopCategories/jewelCategories.json";
import othersCategories from "@/app/utils/shopCategories/othersCategories.json";

export default function Categories({
  products,
  setProducts,
  isCategoriesDisplay,
  setIsCategoriesDisplay,
}) {
  return (
    <div
      className={`${
        isCategoriesDisplay ? "categories_wrapper" : "displayNone"
      }`}
    >
      <div
        onClick={() => {
          setIsCategoriesDisplay(!isCategoriesDisplay);
        }}
        className="displayCategories"
      >
        <p>
          {isCategoriesDisplay
            ? "Masquer les catégories"
            : "Afficher les categories"}
        </p>
      </div>
      <div className="categorie_wrapper">
        <h2>Mineraux</h2>
        <ul>
          {stoneCategories.map((categorie, index) => (
            <li
              key={`${categorie.value} ${index}`}
              onClick={() => {
                setProducts({
                  ...products,
                  filter: null,
                  page: 1,
                  categorie: categorie.value,
                });
              }}
            >
              {categorie.value}
            </li>
          ))}
        </ul>
      </div>
      <div className="categorie_wrapper">
        <ul>
          <h2>Bijoux</h2>

          {jewelCategories.map((categorie, index) => (
            <li
              key={`${categorie.value} ${index}`}
              onClick={() => {
                setProducts({
                  ...products,
                  filter: null,
                  page: 1,
                  categorie: categorie.value,
                });
              }}
            >
              {categorie.value}
            </li>
          ))}
        </ul>
      </div>
      <div className="categorie_wrapper">
        <ul>
          <h2>Autres</h2>

          {othersCategories.map((categorie, index) => (
            <li
              key={`${categorie.value} ${index}`}
              onClick={() => {
                setProducts({
                  ...products,
                  filter: null,
                  page: 1,
                  categorie: categorie.value,
                });
              }}
            >
              {categorie.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
