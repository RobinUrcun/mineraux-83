"use client";

import React from "react";
import Button from "@/app/ui/Components/Button/Button";
import { useState, useEffect } from "react";
import Image from "next/image";
import { stringify } from "querystring";

export default function page() {
  const [newProduct, setNewProduct] = useState({
    title: null,
    description: null,
    price: null,
    size: null,
    weight: null,
    origin: null,
    image: [],
  });
  useEffect(() => {
    console.log(newProduct);
  }, [newProduct]);
  const [image, setImage] = useState();

  const [nbrInput, setNbrInput] = useState([""]);
  const addInput = () => {
    setNbrInput([...nbrInput, "input"]);
  };
  const uploadImage = function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        console.log(base64Image);

        setNewProduct({
          ...newProduct,
          image: [...newProduct.image, base64Image],
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const submitProduct = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fetch("http://localhost:3001/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
      },
      body: JSON.stringify(newProduct),
    })
      .then(() => {
        console.log("fonctionne");
      })
      .catch((error) => console.log(error));
  };

  return (
    <article className="addProduct">
      <h2>Nouvelle Pierre</h2>
      <form onSubmit={submitProduct}>
        <input
          type="text"
          placeholder="Nom de la pierre"
          onChange={(e) => {
            setNewProduct({ ...newProduct, title: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => {
            setNewProduct({ ...newProduct, description: e.target.value });
          }}
        />
        <input
          type="number"
          placeholder="Prix"
          onChange={(e) => {
            setNewProduct({ ...newProduct, price: e.target.value * 100 });
          }}
        />
        <input
          type="text"
          placeholder="Taille"
          onChange={(e) => {
            setNewProduct({ ...newProduct, size: e.target.value });
          }}
        />
        <input
          type="number"
          placeholder="Poids (en grammes)"
          onChange={(e) => {
            setNewProduct({ ...newProduct, weight: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Provenance"
          onChange={(e) => {
            setNewProduct({ ...newProduct, origin: e.target.value });
          }}
        />
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            uploadImage(e);
          }}
        />

        {newProduct.image.map((image, index) => {
          console.log(index);
          console.log("file" + stringify(index));
          return (
            <input
              key={index}
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                uploadImage(e);
              }}
            />
          );
        })}

        <Button>Créer une pierre</Button>
      </form>
    </article>
  );
}
