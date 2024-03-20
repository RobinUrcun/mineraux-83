"use client";
import React from "react";
import Button from "../ui/Components/Button/Button";
import Link from "next/link";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/utils/context/userContext";

export default function page() {
  const router = useRouter();
  const { isUserConnected, setIsUserConnected } = useContext(UserContext);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  function getEmailValue(e) {
    setEmailValue(e.target.value);
  }
  function getPasswordValue(e) {
    setPasswordValue(e.target.value);
  }
  return (
    <section className="loginSection">
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
              email: emailValue,
              password: passwordValue,
            }),
          })
            .then((response) =>
              response.json().then((data) => {
                localStorage.setItem("userInfoToken", data.token);
                localStorage.setItem("userInfoUserId", data.userId);
                setIsUserConnected("true");
              })
            )
            .catch((error) => console.log(error));
          router.push("/boutique");
        }}
      >
        <input
          type="email"
          id="loginMail"
          placeholder="Adresse e-mail"
          onChange={getEmailValue}
        />

        <input
          type="password"
          id="loginPassword"
          placeholder="Mot de passe"
          onChange={getPasswordValue}
        />

        <Button type="submit">Se connecter</Button>
      </form>
      <div className="helpLogin">
        <Link href="">Impossible de se connecter</Link>
        <Link href="/signup">Je n&apos;ai pas de compte</Link>
      </div>
    </section>
  );
}
