"use client";

import React from "react";
import Caroussel from "@/app/ui/Components/Caroussel/Caroussel";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "@/app/utils/context/userContext";
import { useParams } from "next/navigation";
import { addToCart } from "@/app/utils/cart/addToCart";
import Toast from "@/app/ui/Components/Toast/Toast";
import showToast from "@/app/utils/toast/showToast";

export default function page() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [imgUrlList, setImgUrlList] = useState([]);
  const [product, setProduct] = useState({});
  const url = useParams().id;
  useEffect(() => {
    const fetchData = async function () {
      fetch(`http://localhost:3001/api/product/${url}`)
        .then((response) => {
          response.json().then((data) => {
            console.log(data);
            const imgUrl = [];
            imgUrl.push(data[0].mainFile[0]);
            for (let i = 0; i < data[0].file.length; i++) {
              imgUrl.push(data[0].file[i]);
            }
            setProduct(data[0]);
            setImgUrlList(imgUrl);
          });
        })
        .catch((err) => console.log("erreur"));
    };
    fetchData();
  }, []);
  return (
    <section className="sectionProduct">
      <article className="productArticle">
        <Caroussel imgUrl={imgUrlList} name={product.title} />
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
          <div
            className="button"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product._id, userInfo);
              showToast();
            }}
          >
            Ajouter au panier
          </div>
        </div>
      </article>
      <Toast>Produit ajouté !</Toast>
    </section>
  );
}
