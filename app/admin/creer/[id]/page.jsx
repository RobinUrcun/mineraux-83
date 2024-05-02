"use client";

import React from "react";
import { useState, useEffect } from "react";
import Button from "@/app/ui/Components/Button/Button";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Loader from "@/app/ui/Components/Loader/Loader";

export default function page() {
  const router = useRouter();
  const url = useParams().id;
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async function () {
      fetch(`http://localhost:3001/api/product/${url}`)
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            response.json().then((data) => {
              delete data[0].mainFile;
              delete data[0].file;

              setData({ ...data[0], mainFile: [], file: [] });
            });
          } else {
            setData("erreur");
          }
        })
        .catch((err) => {
          setData("erreur");
        });
    };
    fetchData();
  }, []);
  console.log(data);

  const submitForm = function (e) {
    setIsLoading(true);

    e.preventDefault();
    e.stopPropagation();
    const elements = e.target.elements;
    const formData = new FormData();

    formData.append("title", elements.title.value);
    formData.append("description", elements.description.value);
    formData.append("price", elements.price.value * 100);
    formData.append("size", elements.size.value);
    formData.append("weight", elements.weight.value);
    formData.append("origin", elements.origin.value);
    formData.append("reference", elements.reference.value);
    formData.append("mainFile", elements.mainFile.files[0]);

    for (let i = 0; i < elements.file.files.length; i++) {
      formData.append("files", elements.file.files[i]);
    }

    fetch("http://localhost:3001/api/product/", {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
      },
      body: formData,
    })
      .then(() => {
        console.log("fonctionne");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  if (!data) {
    return <Loader />;
  } else if (data === "erreur") {
    router.push("/erreur");
  } else {
    return (
      <article className="addProduct">
        <h2>Créer une pierre</h2>
        <form onSubmit={submitForm} encType="multipart/form-data">
          <input
            name="title"
            type="text"
            id="title"
            value={data.title}
            placeholder="Nom de la pierre"
            onChange={(e) => {
              setData({ ...data, title: e.target.value });
            }}
          />
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={data.description}
            onChange={(e) => {
              setData({ ...data, description: e.target.value });
            }}
          />
          <input
            name="price"
            id="price"
            step="0.01"
            type="number"
            placeholder="Prix"
            value={data.price / 100}
            onChange={(e) => {
              setData({ ...data, price: e.target.value * 100 });
            }}
          />
          <input
            name="size"
            id="size"
            type="text"
            placeholder="Taille"
            value={data.size}
            onChange={(e) => {
              setData({ ...data, size: e.target.value });
            }}
          />
          <input
            name="weight"
            id="weight"
            type="number"
            placeholder="Poids (en grammes)"
            value={data.weight}
            onChange={(e) => {
              setData({ ...data, weight: e.target.value });
            }}
          />
          <input
            name="origin"
            id="origin"
            type="text"
            placeholder="Provenance"
            value={data.origin}
            onChange={(e) => {
              setData({ ...data, origin: e.target.value });
            }}
          />
          <input
            name="reference"
            type="text"
            id="reference"
            placeholder="Référence"
            value={data.reference}
            onChange={(e) => {
              setData({ ...data, reference: e.target.value });
            }}
          />
          <label htmlFor="mainFile">Photo principale</label>
          <input
            name="mainFile"
            id="mainFile"
            type="file"
            accept="image/png, image/jpeg"
          />
          <label htmlFor="file">Photos</label>
          <input
            name="file"
            id="file"
            type="file"
            accept="image/png, image/jpeg"
            multiple
          />
          {isLoading ? <Loader /> : <Button>Créer une pierre</Button>}
        </form>
      </article>
    );
  }
}
