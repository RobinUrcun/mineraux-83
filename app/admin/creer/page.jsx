"use client";

import React from "react";
import Button from "@/app/ui/Components/Button/Button";
import { useState } from "react";
import Image from "next/image";

export default function page() {
  const [newProduct, setNewProduct] = useState({
    title: null,
    description: null,
    price: null,
    size: null,
  });
  const [image, setImage] = useState();

  const [nbrInput, setNbrInput] = useState([""]);
  const addInput = () => {
    setNbrInput([...nbrInput, "input"]);
    console.log(nbrInput);
  };
  const uploadImage = function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        setImage(base64Image);
        console.log(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <article className="addProduct">
      <h2>Nouvelle Pierre</h2>
      <form>
        <input type="text" placeholder="Nom de la pierre" />
        <input type="text" placeholder="Description" />
        <input type="text" placeholder="Prix" />
        <input type="text" placeholder="Taille" />
        {nbrInput.map((input, index) => {
          return (
            <div className="imageUpload">
              <label for="file" class="label-file">
                Choisir une photo
              </label>
              <input
                id="file"
                key={input + index}
                type="file"
                accept="image/png, image/jpeg"
                multiple
                onChange={(e) => {
                  uploadImage(e);
                }}
              />
              <Image src={image} width={100} height={100} alt="aucun" />
            </div>
          );
        })}

        <div className="addPicture" onClick={addInput}>
          Ajouter une photo
        </div>

        <Button>Créer une pierre</Button>
      </form>
    </article>
  );
}
