import React from "react";

export default function page() {
  return (
    <article>
      <h2>Nouvelle Pierre</h2>
      <form>
        <input type="text" placeholder="Nom de la pierre" />
        <input type="text" placeholder="Description" />
        <input type="text" placeholder="Prix" />
        <input type="text" placeholder="Taille" />
      </form>
    </article>
  );
}
