"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Button from "@/app/ui/Components/Button/Button";
import { validPassword } from "@/app/utils/regex/regex";
import InputMessage from "@/app/ui/Components/InputMessage/InputMessage";

export default function ResetPasswordForm() {
  const token = useParams().id;
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    newPasswordVerify: "",
  });

  const fetchData = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/user/reset-password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password: e.target.elements.newPassword.value }),
    });
  };
  console.log(newPassword);
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
    </form>
  );
}
