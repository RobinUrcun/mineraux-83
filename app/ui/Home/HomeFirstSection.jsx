import React from "react";
import Image from "next/image";

export default function HomeFirstSection() {
  return (
    <section className="homeFirstSection">
      <h1>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum a, illo
        neque culpa similique tempora ipsa
      </h1>
      <Image src="/assets/geode.webp" width={400} height={400} alt="Geode" />
    </section>
  );
}
