"use client";
import React from "react";
import Head1 from "../ui/Components/head1/Head1";
import Button from "../ui/Components/Button/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { validEmail, validName, validPassword } from "../utils/regex/regex";

export default function page() {
  const router = useRouter();
  // ETAT PERMETTANT LA VERIFICATION DES REGEX //
  const [regexVerif, setRegexVerif] = useState({
    surname: "",
    name: "",
    email: "",
    password: "",
    secPassword: "",
  });

  // VERFICATION DU  NOM //
  function getSurnameValue(e) {
    setRegexVerif({
      ...regexVerif,
      surname: e.target.value,
    });
  }

  // VERFICATION DU  PRENOM //
  function getNameValue(e) {
    setRegexVerif({
      ...regexVerif,
      name: e.target.value,
    });
  }

  // VERFICATION DE L'EMAIL //

  function getEmailValue(e) {
    setRegexVerif({
      ...regexVerif,
      email: e.target.value,
    });
  }

  // VERFICATION DU MOT DE PASSE (REGEX) //

  function getPasswordValue(e) {
    setRegexVerif({
      ...regexVerif,
      password: e.target.value,
    });
  }

  // VERIFICATION DE DEUXIEME MOT DE PASSE //

  function getSecondPasswordValue(e) {
    setRegexVerif({
      ...regexVerif,
      secPassword: e.target.value,
    });
  }

  return (
    <section className="signupSection">
      <Head1>Créer un compte</Head1>
      <div className="signupSectionWrapper">
        <form
          onSubmit={(e) => {
            if (
              validName.test(regexVerif.name) &&
              validName.test(regexVerif.surname) &&
              validEmail.test(regexVerif.email) &&
              validPassword.test(regexVerif.password) &&
              validPassword.test(regexVerif.secPassword) &&
              regexVerif.password === regexVerif.secPassword
            ) {
              e.preventDefault();
              e.stopPropagation();
              fetch("http://localhost:3001/api/user/signup", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: regexVerif.email,
                  password: regexVerif.password,
                  name: regexVerif.name,
                  surname: regexVerif.surname,
                }),
              })
                .then((response) => {
                  if (response.status === 400) {
                    alert("adresse mail deja utilisée");
                  } else if (response.status === 201) {
                    router.push("/boutique");
                  }
                })
                .catch((error) => console.log(error));
            }
          }}
        >
          <input
            type="text"
            placeholder="Nom"
            className={
              regexVerif.surname == ""
                ? null
                : validName.test(regexVerif.surname)
                ? null
                : "errorInput"
            }
            onChange={getSurnameValue}
          />

          <input
            type="text"
            className={
              regexVerif.name == ""
                ? null
                : validName.test(regexVerif.name)
                ? null
                : "errorInput"
            }
            placeholder="Prénom"
            onChange={getNameValue}
          />

          <input
            type="email"
            className={
              regexVerif.email == ""
                ? null
                : validEmail.test(regexVerif.email)
                ? null
                : "errorInput"
            }
            placeholder="Adresse e-mail"
            onChange={getEmailValue}
          />

          <input
            type="password"
            className={
              regexVerif.password == ""
                ? null
                : validPassword.test(regexVerif.password)
                ? null
                : "errorInput"
            }
            placeholder="Mot de passe"
            onChange={getPasswordValue}
          />

          <input
            type="password"
            className={
              regexVerif.secPassword == ""
                ? null
                : regexVerif.password == regexVerif.secPassword
                ? null
                : "errorInput"
            }
            placeholder="Confirmer le mot de passe"
            onChange={getSecondPasswordValue}
          />

          {validName.test(regexVerif.name) &&
          validName.test(regexVerif.surname) &&
          validEmail.test(regexVerif.email) &&
          validPassword.test(regexVerif.password) &&
          validPassword.test(regexVerif.secPassword) &&
          regexVerif.password === regexVerif.secPassword ? (
            <Button type="submit">Créer son compte</Button>
          ) : (
            <Button type="submit" disabled="true">
              Créer son compte
            </Button>
          )}
        </form>
      </div>
    </section>
  );
}
