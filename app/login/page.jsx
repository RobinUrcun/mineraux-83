"use client";
import { useEffect } from "react";
import React from "react";
import Button from "../ui/Components/Button/Button";
import Link from "next/link";

export default function page() {

  return (
    <section className="loginSection">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <input type="email" id="loginMail" placeholder="Adresse e-mail" />

        <input type="password" id="loginPassword" placeholder="Mot de passe" />

        <Button type="submit">Se connecter</Button>
      </form>
      <div className="helpLogin">
        <Link href="">Impossible de se connecter</Link>
        <Link href="/signup">Je n&apos;ai pas de compte</Link>
      </div>
    </section>
  );
}
