"use client";
import React from "react";
import Head1 from "../ui/Components/head1/Head1";
import Button from "../ui/Components/Button/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { validEmail, validName, validPassword } from "../utils/regex/regex";
import InputMessage from "../ui/Components/InputMessage/InputMessage";

import ToastFailed from "@/app/ui/Components/Toast/ToastFailed";
import showToastFailed from "@/app/utils/toast/showToastFailed";
import Loader from "@/app/ui/Components/Loader/Loader";

export default function page() {
  const router = useRouter();

  const [isLoader, setIsLoader] = useState(false);

  // ETAT PERMETTANT LA VERIFICATION DES REGEX //
  const [inputData, setInputData] = useState({
    surname: "",
    name: "",
    email: "",
    password: "",
    secPassword: "",
  });

  return (
    <section className="signupSection">
      <Head1>Créer un compte</Head1>
      <div className="signupSectionWrapper">
        <form
          onSubmit={(e) => {
            setIsLoader(true);
            if (
              validName.test(inputData.name) &&
              validName.test(inputData.surname) &&
              validEmail.test(inputData.email) &&
              validPassword.test(inputData.password) &&
              validPassword.test(inputData.secPassword) &&
              inputData.password === inputData.secPassword
            ) {
              e.preventDefault();
              e.stopPropagation();
              fetch("https://mineraux83-api.vercel.app/api/user/signup", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: inputData.email,
                  password: inputData.password,
                  name: inputData.name,
                  surname: inputData.surname,
                }),
              })
                .then((response) => {
                  setIsLoader(false);

                  if (response.ok) {
                    router.push("/login");
                  } else {
                    showToastFailed();
                  }
                })
                .catch((error) => console.log(error));
            }
          }}
        >
          <label htmlFor="surname">Nom : </label>
          <input
            id="surname"
            autoComplete="family-name"
            type="text"
            placeholder="Nom"
            className={
              inputData.surname == ""
                ? null
                : validName.test(inputData.surname)
                ? null
                : "errorInput"
            }
            onChange={(e) => {
              setInputData({
                ...inputData,
                surname: e.target.value,
              });
            }}
          />
          <InputMessage
            classNames={
              inputData.surname === ""
                ? false
                : validName.test(inputData.surname)
                ? false
                : true
            }
          >
            Votre nom ne peut contenir que des lettres !
          </InputMessage>
          <label htmlFor="name">Prénom :</label>
          <input
            id="name"
            autoComplete="given-name"
            type="text"
            className={
              inputData.name == ""
                ? null
                : validName.test(inputData.name)
                ? null
                : "errorInput"
            }
            placeholder="Prénom"
            onChange={(e) => {
              setInputData({
                ...inputData,
                name: e.target.value,
              });
            }}
          />
          <InputMessage
            classNames={
              inputData.name === ""
                ? false
                : validName.test(inputData.name)
                ? false
                : true
            }
          >
            Votre prénom ne peut contenir que des lettres !
          </InputMessage>
          <label htmlFor="email">Email : </label>
          <input
            id="email"
            autoComplete="email"
            type="email"
            className={
              inputData.email == ""
                ? null
                : validEmail.test(inputData.email)
                ? null
                : "errorInput"
            }
            placeholder="Adresse e-mail"
            onChange={(e) => {
              setInputData({
                ...inputData,
                email: e.target.value.toLowerCase(),
              });
            }}
          />
          <InputMessage
            classNames={
              inputData.email === ""
                ? false
                : validEmail.test(inputData.email)
                ? false
                : true
            }
          >
            Format de l'email non reconnu !
          </InputMessage>
          <label htmlFor="password">Mot de passe:</label>
          <input
            id="password"
            autoComplete="new-password"
            type="password"
            className={
              inputData.password == ""
                ? null
                : validPassword.test(inputData.password)
                ? null
                : "errorInput"
            }
            placeholder="Mot de passe"
            onChange={(e) => {
              setInputData({
                ...inputData,
                password: e.target.value,
              });
            }}
          />
          <InputMessage
            classNames={
              inputData.password === ""
                ? false
                : validPassword.test(inputData.password)
                ? false
                : true
            }
          >
            Votre mot de passe doit contenir 6 caractères minimum dont au moins
            1 chiffre et 1 lettre !
          </InputMessage>
          <label htmlFor="secPassword">Confirmer votre mot de passe : </label>
          <input
            id="secPassword"
            autoComplete="new-password"
            type="password"
            className={
              inputData.secPassword == ""
                ? null
                : inputData.password === inputData.secPassword
                ? null
                : "errorInput"
            }
            placeholder="Confirmer le mot de passe"
            onChange={(e) => {
              setInputData({
                ...inputData,
                secPassword: e.target.value,
              });
            }}
          />
          <InputMessage
            classNames={
              inputData.secPassword === ""
                ? false
                : inputData.password === inputData.secPassword
                ? false
                : true
            }
          >
            Vos mots de passe ne correspondent pas !
          </InputMessage>
          {isLoader ? (
            <Loader />
          ) : validName.test(inputData.name) &&
            validName.test(inputData.surname) &&
            validEmail.test(inputData.email) &&
            validPassword.test(inputData.password) &&
            validPassword.test(inputData.secPassword) &&
            inputData.password === inputData.secPassword ? (
            <Button type="submit">Créer son compte</Button>
          ) : (
            <Button type="submit" disabled="true">
              Créer son compte
            </Button>
          )}
        </form>
      </div>
      <ToastFailed>Adresse mail déja utilisée !</ToastFailed>
    </section>
  );
}
