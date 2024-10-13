"use client";

import React from "react";
import { useState } from "react";
import Button from "@/app/ui/Components/Button/Button";
import Loader from "@/app/ui/Components/Loader/Loader";
import Toast from "@/app/ui/Components/Toast/Toast";
import ToastFailed from "@/app/ui/Components/Toast/ToastFailed";
import showToast from "@/app/utils/toast/showToast";
import showToastFailed from "@/app/utils/toast/showToastFailed";
import Creatable from "react-select/creatable";
import options from "@/app/utils/shopCategories/shopCategories.json";

const selectStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles) => ({ ...styles, color: "grey" }),
  dropdownIndicator: (style) => ({
    ...style,
    color: "grey",
    svg: {
      fill: "grey",
    },
  }),
};

export default function page() {
  const [select, setIsSelect] = useState([]);
  console.log(select);

  const [isLoading, setIsLoading] = useState(false);
  const submitProduct = (e) => {
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
    for (let index = 0; index < select.length; index++) {
      formData.append("categories", select[index].value);
    }
    formData.append("mainFile", elements.mainFile.files[0]);
    for (let i = 0; i < elements.file.files.length; i++) {
      formData.append("files", elements.file.files[i]);
    }
    // http://localhost:3000/api/product //
    fetch("https://mineraux83-api.vercel.app/api/product/", {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
      },
      body: formData,
    })
      .then((response) => {
        if (response.status === 201) {
          setIsLoading(false);
          showToast();
        } else {
          setIsLoading(false);
          showToastFailed();
        }
      })
      .catch((error) => {
        setIsLoading(false);
        showToastFailed();
      });
  };

  return (
    <article className="addProduct">
      <h2>Nouvelle Pierre</h2>
      <form onSubmit={submitProduct} encType="multipart/form-data">
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
        <Creatable
          id="categories"
          options={options}
          isMulti
          styles={selectStyles}
          onChange={(e) => {
            setIsSelect(e);
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
        {!isLoading ? <Button>Créer une pierre</Button> : <Loader />}
      </form>
      <Toast>Produit crée</Toast>
      <ToastFailed>Impossible de créer</ToastFailed>
    </article>
  );
}
