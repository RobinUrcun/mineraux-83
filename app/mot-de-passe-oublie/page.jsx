"use client";

import React from "react";
import Head1 from "../ui/Components/head1/Head1";
import Button from "../ui/Components/Button/Button";

export default function page() {
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
      console.log(response);
    });
  };
  return (
    <section className="resetPassword">
      <Head1>Mot de passe oublié ?</Head1>
      <form
        onSubmit={(e) => {
          submitForm(e);
        }}
        className="resetPasswordForm"
      >
        <div className="resetPasswordFormWrapper">
          <label htmlFor="email">Renseignez votre adresse e-mail :</label>
          <input id="email" name="email" autoComplete="email" type="email" />
        </div>

        <Button type={"submit"}>Envoyer</Button>
      </form>
    </section>
  );
}
