"use client";

import React from "react";
import Button from "@/app/ui/Components/Button/Button";
import { useState, useEffect } from "react";
import Loader from "@/app/ui/Components/Loader/Loader";
import { useRouter } from "next/navigation";
import { validEmail, validPassword, validName } from "@/app/utils/regex/regex";

export default function page() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchData = async function () {
      await fetch(`http://localhost:3001/api/user/userInfo/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
        },
      })
        .then((response) => {
          if (response.status === 401) {
            router.push("/erreur");
          } else {
            response.json().then((data) => {
              setUserData({
                ...data,
                actualPassword: null,
                newPassword: null,
                verifNewPassword: null,
              });
            });
          }
        })
        .catch((error) => {
          setUserData("error");
        });
    };
    fetchData();
  }, []);
  if (userData === null) {
    return <Loader />;
  } else if (userData === "error") {
    router.push("/error");
  } else {
    return (
      <article className="monCompteInformations">
        <h2>Mes informations</h2>
        <form
          onSubmit={() => {
            const fetchData = async function () {};
          }}
        >
          <div className="monCompteInformationsEmail">{userData.email}</div>
          <input
            type="text"
            placeholder="Nom"
            value={userData.name}
            className={validName.test(userData.name) ? null : "errorInput"}
            onChange={(e) => {
              setUserData({ ...userData, name: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Prenom"
            value={userData.surname}
            className={validName.test(userData.surname) ? null : "errorInput"}
            onChange={(e) => {
              setUserData({ ...userData, surname: e.target.value });
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe actuel"
            className={
              !userData.actualPassword
                ? null
                : validPassword.test(userData.actualPassword)
                ? null
                : "errorInput"
            }
            onChange={(e) => {
              setUserData({ ...userData, actualPassword: e.target.value });
            }}
          />
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            className={
              !userData.newPassword
                ? null
                : validPassword.test(userData.newPassword)
                ? null
                : "errorInput"
            }
            onChange={(e) => {
              setUserData({ ...userData, newPassword: e.target.value });
            }}
          />
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            className={
              !userData.verifNewPassword
                ? null
                : validPassword.test(userData.verifNewPassword)
                ? null
                : "errorInput"
            }
            onChange={(e) => {
              setUserData({ ...userData, verifNewPassword: e.target.value });
            }}
          />
          <Button
            type="submit"
            disabled={
              validName.test(userData.name) &&
              validName.test(userData.surname) &&
              validPassword.test(userData.actualPassword) &&
              validPassword.test(userData.newPassword) &&
              userData.newPassword === userData.verifNewPassword
                ? null
                : "true"
            }
          >
            Modifier
          </Button>
        </form>
      </article>
    );
  }
}
