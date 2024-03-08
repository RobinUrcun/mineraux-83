import React from "react";
import Link from "next/link";

export default function nav({ section }) {
  return (
    <nav className={`${section}Nav`}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/pierre">Nos mineraux</Link>
        </li>
        <li>
          <Link href="/about">À propos</Link>
        </li>
        <li>
          <Link href="/contact">Nous contacter</Link>
        </li>
      </ul>
    </nav>
  );
}
