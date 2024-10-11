import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomeFirstSection() {
  return (
    <section className="homeFirstSection">
      <article className="homeFirstSectionArticle">
        <div className="homeFirstSectionH1">
          <h1>
            <span className="title_name">
              Mineraux et fossiles du monde spécialiste du Var et de la Corse
            </span>
            <span className="title_aside">
              Sciage et polissage dans mon atelier
            </span>
            <span className="title_shipping">Livraison offerte dès 60 €</span>
          </h1>
          <Link href="#homePresentationSection" className="doubleArrowWrapper">
            <Image
              src="/form/arrow.webp"
              width={47}
              height={80}
              alt="aller à la section suivante"
            />

            <Image
              src="/form/arrow.webp"
              width={47}
              height={80}
              alt="aller à la section suivante"
            />
          </Link>
        </div>
        <Image
          src="/assets/geode2.webp"
          width={400}
          height={400}
          alt="Geode"
          className="homepageMainImage"
        />
      </article>
    </section>
  );
}
