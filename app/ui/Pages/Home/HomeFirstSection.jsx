import React from "react";
import Image from "next/image";

export default function HomeFirstSection() {
  return (
    <section className="homeFirstSection">
      <h1>
        <span>Mineraux du monde spécialise du Var et de la Corse</span>
        <span>Sciage et polissage dans mon atelier</span>
      </h1>
      <Image src="/assets/geode2.png" width={400} height={400} alt="Geode" />
    </section>
  );
}
