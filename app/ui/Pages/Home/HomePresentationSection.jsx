import React from "react";
import HomepageCaroussel from "../../Components/HomepageCaroussel/HomepageCaroussel";
import Link from "next/link";

export default function HomePresentationSection() {
  return (
    <section id="homePresentationSection" className="homePresentationSection">
      <article className="homePresentationArticle">
        <h2>**Bienvenue dans le Monde des Minéraux !**</h2>
        <p>
          Au cœur de notre site de vente de minéraux, nous vous invitons à
          explorer les merveilles de la Terre, cristallisées dans des formes,
          des couleurs et des énergies uniques. Depuis [année de fondation],
          nous nous sommes engagés à fournir aux passionnés de minéraux,
          collectionneurs et amateurs, une plateforme où l'authenticité, la
          qualité et la diversité sont nos maîtres-mots.
        </p>
        <Link href="/about" className="button">
          Découvrez nous
        </Link>
      </article>
      <HomepageCaroussel />
    </section>
  );
}
