"use client";

import React from "react";
import Button from "@/app/ui/Components/Button/Button";
import { useState } from "react";

export default function page() {
  const [nbrInput, setNbrInput] = useState(["input"]);
  const addInput = () => {
    setNbrInput([...nbrInput, "input"]);
    console.log(nbrInput);
  };
  const uploadImage = function (e) {
    console.log(e.target.files);
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
            <input
              key={input + index}
              type="file"
              accept="image/png, image/jpeg"
              multiple
              onChange={(e) => {
                uploadImage(e);
              }}
            />
          );
        })}
        <div className="addPicture" onClick={addInput}>
          +
        </div>

        <Button>Créer une pierre</Button>
      </form>
    </article>
  );
}
