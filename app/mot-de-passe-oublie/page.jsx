"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Head1 from "../ui/Components/head1/Head1";
import Button from "../ui/Components/Button/Button";
import ToastFailed from "../ui/Components/Toast/ToastFailed";
import showToastFailed from "../utils/toast/showToastFailed";

export default function page() {
  const router = useRouter();
  const submitForm = (e) => {
    e.preventDefault();
    console.log(e.target.elements.email.value);
    fetch("http://localhost:3001/api/user/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: e.target.elements.email.value }),
    }).then((response) => {
      if (response.ok) {
        router.push("/email-envoye");
      } else {
        showToastFailed();
      }
    });
  };
  return (
    <section className="forgotPasswordSection">
      <Head1>Mot de passe oublié ?</Head1>
      <form
        onSubmit={(e) => {
          submitForm(e);
        }}
        className="forgotPasswordForm"
      >
        <div className="forgotPasswordFormWrapper">
          <label htmlFor="email">Renseignez votre adresse e-mail :</label>
          <input id="email" name="email" autoComplete="email" type="email" />
        </div>

        <Button type={"submit"}>Envoyer</Button>
      </form>
      <ToastFailed>Utilisateur introuvable</ToastFailed>
    </section>
  );
}
