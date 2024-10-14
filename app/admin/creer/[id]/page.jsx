"use client";

import React from "react";
import { useState, useEffect } from "react";
import Button from "@/app/ui/Components/Button/Button";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Loader from "@/app/ui/Components/Loader/Loader";
import Toast from "@/app/ui/Components/Toast/Toast";
import showToast from "@/app/utils/toast/showToast";
import ToastFailed from "@/app/ui/Components/Toast/ToastFailed";
import showToastFailed from "@/app/utils/toast/showToastFailed";
import Select from "react-select";
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
  const router = useRouter();
  const url = useParams().id;
  const [isLoading, setIsLoading] = useState(false);
  const [select, setIsSelect] = useState([]);
  const [data, setData] = useState(null);
  console.log(select);

  useEffect(() => {
    const fetchData = async function () {
      fetch(`https://mineraux83-api.vercel.app/api/product/${url}`)
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              delete data[0].mainFile;
              delete data[0].file;
              console.log(data);

              setIsSelect(
                data[0].categories?.map((categorie) => ({
                  label: categorie,
                  value: categorie,
                }))
              );
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
    for (let index = 0; index < select.length; index++) {
      formData.append("categories", select[index].value);
    }
    formData.append("mainFile", elements.mainFile.files[0]);

    for (let i = 0; i < elements.file.files.length; i++) {
      formData.append("files", elements.file.files[i]);
    }

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
        console.log(error);
        setIsLoading(false);
        showToastFailed();
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
            value={data.title ? data.title : undefined}
            placeholder="Nom de la pierre"
            onChange={(e) => {
              setData({ ...data, title: e.target.value });
            }}
          />
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={data.description ? data.description : undefined}
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
            value={data.price ? data.price / 100 : undefined}
            onChange={(e) => {
              setData({ ...data, price: e.target.value * 100 });
            }}
          />
          <input
            name="size"
            id="size"
            type="text"
            placeholder="Taille"
            value={data.size ? data.size : undefined}
            onChange={(e) => {
              setData({ ...data, size: e.target.value });
            }}
          />
          <input
            name="weight"
            id="weight"
            type="number"
            placeholder="Poids (en grammes)"
            value={data.weight ? data.weight : undefined}
            onChange={(e) => {
              setData({ ...data, weight: e.target.value });
            }}
          />
          <input
            name="origin"
            id="origin"
            type="text"
            placeholder="Provenance"
            value={data.origin ? data.origin : undefined}
            onChange={(e) => {
              setData({ ...data, origin: e.target.value });
            }}
          />
          <input
            name="reference"
            type="text"
            id="reference"
            placeholder="Référence"
            value={data.reference ? data.reference : undefined}
            onChange={(e) => {
              setData({ ...data, reference: e.target.value });
            }}
          />
          <Select
            id="categories"
            options={options}
            isMulti
            defaultValue={select ? select : false}
            styles={selectStyles}
            onChange={(e) => {
              setIsSelect(e.map((e) => e.value));
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
        <Toast>Produit crée</Toast>
        <ToastFailed>Impossible de créer</ToastFailed>
      </article>
    );
  }
}
