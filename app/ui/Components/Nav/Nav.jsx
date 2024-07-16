"use client";
import React from "react";
import Link from "next/link";

export default function nav({ section, setIsOpen }) {
  return (
    <nav className={`${section}Nav`}>
      <ul>
        <li>
          <Link
            href="/"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Accueil
          </Link>
        </li>
        <li>
          <Link
            href="/boutique"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Boutique
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            À propos
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Nous contacter
          </Link>
        </li>
      </ul>
    </nav>
  );
}
