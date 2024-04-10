"use client";

import React from "react";
import Caroussel from "@/app/ui/Components/Caroussel/Caroussel";
import Button from "@/app/ui/Components/Button/Button";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function page() {
  const [product, setProduct] = useState({});
  const url = useParams().id;
  console.log(url);
  useEffect(() => {
    const fetchData = async function () {
      fetch(`http://localhost:3001/api/product/${url}`)
        .then((response) => {
          response.json().then((data) => {
            console.log(data[0]);
            setProduct(data[0]);
          });
        })
        .catch((err) => console.log("erreur"));
    };
    fetchData();
  }, []);
  console.log(product);
  return (
    <section className="sectionProduct">
      <article className="productArticle">
        <Caroussel imgUrl={product.image} name={product} />
        <div className="productInfo">
          <h1>{product.title}</h1>
          <p className="productInfoDescription">{product.description}</p>
          <p className="productInfoProvenance">
            <span className="bold"> Provenance :</span> {product.origin}
          </p>
          <p className="productInfoSize">
            <span className="bold"> Taille :</span>
            {product.size}
          </p>
          <p className="productInfoWeight">
            <span className="bold"> Poids :</span>
            {product.weight} g
          </p>
          <div className="productInfoPrice">
            <p>
              {(product.price / 100).toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <Button>Ajouter au panier</Button>
        </div>
      </article>
    </section>
  );
}
