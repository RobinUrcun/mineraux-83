import React from "react";
import Button from "@/app/ui/Components/Button/Button";

export default function page() {
  return (
    <article className="addProduct">
      <h2>Nouvelle Pierre</h2>
      <form>
        <input type="text" placeholder="Nom de la pierre" />
        <input type="text" placeholder="Description" />
        <input type="text" placeholder="Prix" />
        <input type="text" placeholder="Taille" />
        <input type="text" placeholder="Réference" />

        <Button>Créer une pierre</Button>
      </form>
    </article>
  );
}
