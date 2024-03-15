import React from "react";
import Caroussel from "@/app/ui/Components/Caroussel/Caroussel";
import Button from "@/app/ui/Components/Button/Button";

export default function page() {
  return (
    <section className="sectionProduct">
      <article className="productArticle">
        <Caroussel />
        <div className="productInfo">
          <h1>Nom du Produit</h1>
          <p className="productInfoDescription">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel harum
            architecto facilis repellendus asperiores? Amet, impedit incidunt
            dolores quasi consequatur eveniet dolore veniam. Qui atque molestiae
            aperiam, officiis eaque ab necessitatibus totam ullam. Deserunt
            consectetur et consequuntur eos quae! Mollitia.
          </p>
          <p className="productInfoProvenance">
            <span className="bold"> Provenance :</span> France
          </p>
          <p className="productInfoSize">
            <span className="bold"> Taille :</span> A voir
          </p>
          <p className="productInfoWeight">
            <span className="bold"> Poids :</span> A voir
          </p>
          <div className="productInfoPrice">
            <p>60,00€</p>
          </div>
          <Button>Ajouter au panier</Button>
        </div>
      </article>
    </section>
  );
}
