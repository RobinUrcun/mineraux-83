"use client";

import React from "react";
import Button from "@/app/ui/Components/Button/Button";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "@/app/utils/context/userContext";
import { useRouter } from "next/navigation";
import { validPassword, validName } from "@/app/utils/regex/regex";
import InputMessage from "@/app/ui/Components/InputMessage/InputMessage";
import Toast from "@/app/ui/Components/Toast/Toast";
import ToastFailed from "@/app/ui/Components/Toast/ToastFailed";
import showToast from "@/app/utils/toast/showToast";
import showToastFailed from "@/app/utils/toast/showToastFailed";
import Loader from "@/app/ui/Components/Loader/Loader";

export default function page() {
  const [isLoader, setIsLoader] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    surname: "",
    actualPassword: "",
    newPassword: "",
    verifNewPassword: "",
  });
  useEffect(() => {
    const fetchData = async function () {
      await fetch(`https://mineraux83-api.vercel.app/api/user/userInfo/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              setUserData({
                ...data,
                actualPassword: "",
                newPassword: "",
                verifNewPassword: "",
              });
            });
          } else if (response.status === 401) {
            setUserInfo({
              isUserConnected: null,
              userRole: null,
            });
            localStorage.removeItem("userInfoToken");
            localStorage.removeItem("userInfoUserId");
            localStorage.removeItem("userInfoRole");
            router.push("/login");
          }
        })
        .catch((error) => {
          setUserData("error");
        });
    };
    fetchData();
  }, []);

  const submitForm = function (e) {
    e.preventDefault();
    setIsLoader(true);
    fetch("https://mineraux83-api.vercel.app/api/user/userInfo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        setIsLoader(false);

        if (response.status === 200) {
          showToast();
        } else if (response.status === 403) {
          showToastFailed();
        }
      })
      .catch((err) => {
        showToastFailed();
      });
  };

  if (userData === null) {
    return <Loader />;
  } else if (userData === "error") {
    router.push("/error");
  } else {
    return (
      <article className="monCompteInformations">
        <h2>Mes informations</h2>
        <form
          onSubmit={(e) => {
            submitForm(e);
          }}
        >
          <div className="monCompteInformationsEmail">{userData.email}</div>
          <input
            autoComplete="family-name"
            type="text"
            placeholder="Nom"
            value={userData.name}
            className={
              userData.name === ""
                ? null
                : validName.test(userData.name)
                ? null
                : "errorInput"
            }
            onChange={(e) => {
              setUserData({ ...userData, name: e.target.value });
            }}
          />
          <InputMessage
            classNames={
              userData.name === ""
                ? false
                : validName.test(userData.name)
                ? false
                : true
            }
          >
            Votre nom ne peut contenir que des lettres !
          </InputMessage>
          <input
            autoComplete="given-name"
            type="text"
            placeholder="Prenom"
            value={userData.surname}
            className={
              userData.surname === ""
                ? null
                : validName.test(userData.surname)
                ? null
                : "errorInput"
            }
            onChange={(e) => {
              setUserData({ ...userData, surname: e.target.value });
            }}
          />
          <InputMessage
            classNames={
              userData.surname === ""
                ? false
                : validName.test(userData.surname)
                ? false
                : true
            }
          >
            Votre prénom ne peut contenir que des lettres !
          </InputMessage>
          <input
            type="password"
            placeholder="Mot de passe actuel"
            autoComplete="current-password"
            className={
              userData.actualPassword === ""
                ? null
                : validPassword.test(userData.actualPassword)
                ? null
                : "errorInput"
            }
            onChange={(e) => {
              setUserData({ ...userData, actualPassword: e.target.value });
            }}
          />
          <InputMessage
            classNames={
              userData.actualPassword === ""
                ? false
                : validPassword.test(userData.actualPassword)
                ? false
                : true
            }
          >
            Votre mot de passe doit contenir 6 caractères minimum dont au moins
            1 chiffre et 1 lettre !
          </InputMessage>
          <input
            autoComplete="new-password"
            type="password"
            placeholder="Nouveau mot de passe"
            className={
              userData.newPassword === ""
                ? null
                : validPassword.test(userData.newPassword)
                ? null
                : "errorInput"
            }
            onChange={(e) => {
              setUserData({ ...userData, newPassword: e.target.value });
            }}
          />
          <InputMessage
            classNames={
              userData.newPassword === ""
                ? false
                : validPassword.test(userData.newPassword)
                ? false
                : true
            }
          >
            Votre mot de passe doit contenir 6 caractères minimum dont au moins
            1 chiffre et 1 lettre !
          </InputMessage>
          <input
            autoComplete="new-password"
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
          <InputMessage
            classNames={
              userData.verifNewPassword === ""
                ? false
                : userData.verifNewPassword === userData.newPassword
                ? false
                : true
            }
          >
            Vos mots de passe ne correspondent pas !
          </InputMessage>
          {isLoader ? (
            <Loader />
          ) : (
            <Button
              type="submit"
              disabled={
                validName.test(userData.name) &&
                validName.test(userData.surname) &&
                ((validPassword.test(userData.newPassword) &&
                  userData.newPassword === userData.verifNewPassword) ||
                  (userData.newPassword === "" &&
                    userData.verifNewPassword === ""))
                  ? null
                  : "true"
              }
            >
              Modifier
            </Button>
          )}
        </form>
        <Toast>Informations enregistrées</Toast>
        <ToastFailed>Le mot de passe actuel est éroné</ToastFailed>
      </article>
    );
  }
}
