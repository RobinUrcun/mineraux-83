"use client";
import React from "react";
import Head1 from "../ui/Components/head1/Head1";
import { categories } from "./content/content";
import { useState } from "react";
import Image from "next/image";

export default function page() {
  const [index, setIndex] = useState(0);
  return (
    <section className="aboutSection">
      <Head1>À Propos de nous</Head1>
      <article className="aboutArticle">
        <nav className="aboutNav">
          {categories.map((category) => (
            <div
              key={`${category.title} ${category.index}`}
              className={
                category.index === index
                  ? "aboutNavTitle target"
                  : "aboutNavTitle"
              }
              onClick={() => {
                setIndex(category.index);
              }}
            >
              {category.title}
            </div>
          ))}
        </nav>
        <div className="aboutContentWrapper">
          <div
            className="imgRingArrow"
            onClick={() => {
              if (index === 0) {
                const newIndex = categories.length - 1;
                setIndex(newIndex);
              } else {
                const newIndex = index - 1;
                setIndex(newIndex);
              }
            }}
          >
            <Image
              src="assets/form/arrow.webp"
              width={47}
              height={80}
              alt="Rubrique precédente"
            />
          </div>
          <p className="aboutContent">{categories[index].content}</p>
          <div
            className="imgRingArrow"
            onClick={() => {
              if (index === categories.length - 1) {
                const newIndex = 0;
                setIndex(newIndex);
              } else {
                const newIndex = index + 1;
                setIndex(newIndex);
              }
            }}
          >
            <Image
              src="/form/arrow.webp"
              width={47}
              height={80}
              alt="Rubrique suivante"
              className="arrowAfter"
            />
          </div>
        </div>
      </article>
    </section>
  );
}
