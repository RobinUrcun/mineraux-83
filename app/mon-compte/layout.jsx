import React from "react";
import Head1 from "../ui/Components/head1/Head1";
import Link from "next/link";

export default function layout({ children }) {
  return (
    <section className="sectionMonCompte">
      <Head1>Mon compte</Head1>
      <div className="sectionCompteWrapper">
        <nav>
          <Link href="/mon-compte/informations">Mes informations</Link>
          <Link href="/mon-compte/commandes">Mes commandes</Link>
        </nav>
        {children}
      </div>
    </section>
  );
}
