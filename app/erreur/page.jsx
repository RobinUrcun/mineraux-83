import React from "react";
import Link from "next/link";

export default function page() {
  return (
    <section className="errorSection">
      <h1>404</h1>
      <Link href="/">Retourner à l'accueil</Link>
    </section>
  );
}
