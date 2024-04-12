import React from "react";

export default function page() {
  return (
    <article className="monCompteInformations">
      <h2>Mes informations</h2>
      <form>
        <input type="text" placeholder="Nom" />
        <input type="text" placeholder="Prenom" />
      </form>
    </article>
  );
}
