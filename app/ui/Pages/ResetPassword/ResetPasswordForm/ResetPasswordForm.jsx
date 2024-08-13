"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Button from "@/app/ui/Components/Button/Button";
import { validPassword } from "@/app/utils/regex/regex";
import InputMessage from "@/app/ui/Components/InputMessage/InputMessage";
import { useRouter } from "next/navigation";
import Toast from "@/app/ui/Components/Toast/Toast";
import ToastFailed from "@/app/ui/Components/Toast/ToastFailed";
import showToast from "@/app/utils/toast/showToast";
import showToastFailed from "@/app/utils/toast/showToastFailed";
import Loader from "@/app/ui/Components/Loader/Loader";

export default function ResetPasswordForm() {
  const router = useRouter();
  const token = useParams().id;

  const [isLoader, setIsLoader] = useState(false);

  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    newPasswordVerify: "",
  });

  const fetchData = (e) => {
    setIsLoader(true);
    e.preventDefault();
    fetch("https://mineraux83-api.vercel.app/api/user/reset-password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password: e.target.elements.newPassword.value }),
    }).then((response) => {
      setIsLoader(false);

      if (response.ok) {
        showToast();
        console.log("status", response.status);

        console.log("ok", response.ok);
        router.push("/reset-password-success");
      } else {
        showToastFailed();
      }
    });
  };
  return (
    <form
      onSubmit={(e) => {
        fetchData(e);
      }}
    >
      <div className="resetPasswordFormWrapper">
        <label htmlFor="newPassword">Nouveau mot de passe</label>
        <input
          type="password"
          id="newPassword"
          autoComplete="new-password"
          placeholder="Nouveau mot de passe"
          onChange={(e) => {
            setNewPassword({ ...newPassword, newPassword: e.target.value });
          }}
          className={
            newPassword.newPassword == ""
              ? null
              : validPassword.test(newPassword.newPassword)
              ? null
              : "errorInput"
          }
        />
        <InputMessage
          classNames={
            newPassword.newPassword === ""
              ? false
              : validPassword.test(newPassword.newPassword)
              ? false
              : true
          }
        >
          Votre mot de passe doit contenir 6 caractères minimum dont au moins 1
          chiffre et 1 lettre !
        </InputMessage>
      </div>
      <div className="resetPasswordFormWrapper">
        <label htmlFor="newPasswordVerify">
          Confirmer votre nouveau mot de passe
        </label>
        <input
          type="password"
          id="newPasswordVerify"
          autoComplete="new-password"
          placeholder="Confirmer votre nouveau mot de passe"
          onChange={(e) => {
            setNewPassword({
              ...newPassword,
              newPasswordVerify: e.target.value,
            });
          }}
          className={
            newPassword.newPasswordVerify == ""
              ? null
              : newPassword.newPassword === newPassword.newPasswordVerify
              ? null
              : "errorInput"
          }
        />
        <InputMessage
          classNames={
            newPassword.newPasswordVerify === ""
              ? false
              : newPassword.newPassword === newPassword.newPasswordVerify
              ? false
              : true
          }
        >
          Vos mots de passe ne correspondent pas !
        </InputMessage>
      </div>
      {isLoader ? (
        <Loader />
      ) : (
        <Button
          type={"submit"}
          disabled={
            validPassword.test(newPassword.newPassword) &&
            newPassword.newPassword === newPassword.newPasswordVerify
              ? "false"
              : "true"
          }
        >
          Modifier
        </Button>
      )}
      <Toast>Mot de passe modifié !</Toast>
      <ToastFailed>Mot de passe non modifié ! </ToastFailed>
    </form>
  );
}
