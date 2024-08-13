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
import Loader from "@/app/ui/Components/Loader/Loader";
import showToastFailed from "@/app/utils/toast/showToastFailed";
import ToastFailed from "@/app/ui/Components/Toast/ToastFailed";

export default function page() {
  const router = useRouter();
  const [isLoader, setIsLoader] = useState(false);

  const { userInfo, setUserInfo } = useContext(UserContext);
  const [userData, setUserData] = useState({ email: "", password: "" });
  return (
    <section className="loginSection">
      <Head1>Se connecter</Head1>
      <div className="loginSectionWrapper">
        <form
          onSubmit={(e) => {
            setIsLoader(true);
            e.preventDefault();
            e.stopPropagation();
            fetch("https://mineraux83-api.vercel.app/api/user/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: userData.email.toLowerCase(),
                password: userData.password,
                cart: !localStorage.getItem("panier")
                  ? null
                  : localStorage.getItem("panier"),
              }),
            })
              .then((response) => {
                setIsLoader(false);
                if (response.ok) {
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
                } else {
                  showToastFailed();
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
          {isLoader ? (
            <Loader />
          ) : (
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
          )}
        </form>
        <div className="helpLogin">
          <Link href="/mot-de-passe-oublie">Impossible de se connecter</Link>
          <Link href="/signup">Je n&apos;ai pas de compte</Link>
        </div>
      </div>
      <ToastFailed>Adresse mail ou mot de passe incorrect</ToastFailed>
    </section>
  );
}
