"use client";
import React from "react";
import Button from "../ui/Components/Button/Button";
import Link from "next/link";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/utils/context/userContext";
import { validEmail, validPassword } from "../utils/regex/regex";
import Head1 from "../ui/Components/head1/Head1";
import InputMessage from "@/app/ui/Components/InputMessage/InputMessage";

export default function page() {
  const router = useRouter();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [userData, setUserData] = useState({ email: "", password: "" });
  return (
    <section className="loginSection">
      <Head1>Se connecter</Head1>
      <div className="loginSectionWrapper">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            fetch("http://localhost:3001/api/user/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: userData.email,
                password: userData.password,
                cart: !localStorage.getItem("panier")
                  ? null
                  : localStorage.getItem("panier"),
              }),
            })
              .then((response) => {
                if (response.status === 403) {
                  alert("Email ou mot de passe invalide");
                } else {
                  response.json().then((data) => {
                    localStorage.setItem("userInfoToken", data.token);
                    localStorage.setItem("userInfoUserId", data.userId);
                    localStorage.setItem("userInfoRole", data.userRole);
                    setUserInfo({
                      isUserConnected: true,
                      userRole: data.userRole,
                    });
                    localStorage.removeItem("panier");
                    router.push("/boutique");
                  });
                }
              })
              .catch((error) => {
                router.push("/404");
              });
          }}
        >
          <input
            autoComplete="email"
            type="email"
            id="loginMail"
            placeholder="Adresse e-mail"
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
            className={
              userData.email === ""
                ? null
                : validEmail.test(userData.email)
                ? null
                : "errorInput"
            }
          />
          <InputMessage
            classNames={
              userData.email === ""
                ? false
                : validEmail.test(userData.email)
                ? false
                : true
            }
          >
            Format de l'email non reconnu !
          </InputMessage>

          <input
            autoComplete="current-password"
            type="password"
            id="loginPassword"
            placeholder="Mot de passe"
            onChange={(e) => {
              setUserData({ ...userData, password: e.target.value });
            }}
            className={
              userData.password === ""
                ? null
                : validPassword.test(userData.password)
                ? null
                : "errorInput"
            }
          />
          <InputMessage
            classNames={
              userData.password === ""
                ? false
                : validPassword.test(userData.password)
                ? false
                : true
            }
          >
            Votre mot de passe doit contenir 6 caractères minimum dont au moins
            1 chiffre et 1 lettre !
          </InputMessage>
          <Button
            type="submit"
            disabled={
              validEmail.test(userData.email) &&
              validPassword.test(userData.password)
                ? null
                : "true"
            }
          >
            Se connecter
          </Button>
        </form>
        <div className="helpLogin">
          <Link href="/mot-de-passe-oublie">Impossible de se connecter</Link>
          <Link href="/signup">Je n&apos;ai pas de compte</Link>
        </div>
      </div>
    </section>
  );
}
