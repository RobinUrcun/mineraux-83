"use client";

import { useState, useEffect } from "react";
import React from "react";
import Button from "@/app/ui/Components/Button/Button";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Loader from "@/app/ui/Components/Loader/Loader";
import CardPictures from "@/app/ui/Components/Card/CardPictures";
import Toast from "@/app/ui/Components/Toast/Toast";
import ToastFailed from "@/app/ui/Components/Toast/ToastFailed";
import showToast from "@/app/utils/toast/showToast";
import showToastFailed from "@/app/utils/toast/showToastFailed";

export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const url = useParams().id;

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async function () {
      fetch(`http://localhost:3001/api/product/${url}`)
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              setData(data[0]);
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
    formData.append("mainFile", elements.mainFile.files[0]);

    for (let i = 0; i < elements.file.files.length; i++) {
      formData.append("files", elements.file.files[i]);
    }

    fetch(`http://localhost:3001/api/product/${data._id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
      },
      body: formData,
    })
      .then((response) => {
        if (response.status === 200) {
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

  if (!data) {
    return <Loader />;
  } else if (data === "erreur") {
    router.push("/erreur");
  } else {
    return (
      <article className="modifyProduct">
        <h2>Gerer une pierre</h2>
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
          <div className="picturesWrapper">
            <CardPictures
              picture={data.mainFile}
              typeOfFile={"mainFile"}
              data={data}
              setData={setData}
            />
          </div>
          <input
            name="mainFile"
            id="mainFile"
            type="file"
            accept="image/png, image/jpeg"
          />
          <label htmlFor="file">Photos</label>
          <div className="picturesWrapper">
            {data.file.map((file) => (
              <CardPictures
                key={file}
                picture={file}
                typeOfFile="file"
                data={data}
                setData={setData}
              />
            ))}
          </div>
          <input
            name="file"
            id="file"
            type="file"
            accept="image/png, image/jpeg"
            multiple
          />
          {isLoading ? <Loader /> : <Button>Modifier</Button>}
        </form>
        <Toast>Produit modifié</Toast>
        <ToastFailed>Impossible de modifier</ToastFailed>
      </article>
    );
  }
}
