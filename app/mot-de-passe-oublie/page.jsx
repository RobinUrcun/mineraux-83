"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Head1 from "../ui/Components/head1/Head1";
import Button from "../ui/Components/Button/Button";
import ToastFailed from "../ui/Components/Toast/ToastFailed";
import showToastFailed from "../utils/toast/showToastFailed";
import Loader from "../ui/Components/Loader/Loader";

export default function page() {
  const [isLoader, setIsLoader] = useState(false);
  const router = useRouter();
  const submitForm = (e) => {
    setIsLoader(true);
    e.preventDefault();
    fetch("https://mineraux83-api.vercel.app/api/user/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: e.target.elements.email.value }),
    }).then((response) => {
      setIsLoader(false);
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

        {isLoader ? <Loader /> : <Button type={"submit"}>Envoyer</Button>}
      </form>
      <ToastFailed>Utilisateur introuvable</ToastFailed>
    </section>
  );
}
