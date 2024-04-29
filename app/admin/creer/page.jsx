"use client";

import React from "react";
import Button from "@/app/ui/Components/Button/Button";

export default function page() {
  const submitProduct = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const elements = e.target.elements;
    console.log(elements.file.files[0]);
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
      })
      .catch((error) => console.log(error));
  };

  return (
    <article className="addProduct">
      <h2>Nouvelle Pierre</h2>
      <form onSubmit={submitProduct} enctype="multipart/form-data">
        <input
          name="title"
          type="text"
          id="title"
          placeholder="Nom de la pierre"
        />
        <textarea
          name="description"
          id="description"
          placeholder="Description"
        />
        <input
          name="price"
          id="price"
          step="0.01"
          type="number"
          placeholder="Prix"
        />
        <input name="size" id="size" type="text" placeholder="Taille" />
        <input
          name="weight"
          id="weight"
          type="number"
          placeholder="Poids (en grammes)"
        />
        <input name="origin" id="origin" type="text" placeholder="Provenance" />
        <input
          name="reference"
          type="text"
          id="reference"
          placeholder="Référence"
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
        <Button>Créer une pierre</Button>
      </form>
    </article>
  );
}
