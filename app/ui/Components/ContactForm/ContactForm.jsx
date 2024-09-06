"use client";
import React from "react";
import Toast from "../Toast/Toast";
import ToastFailed from "../Toast/ToastFailed";
import showToast from "@/app/utils/toast/showToast";
import showToastFailed from "@/app/utils/toast/showToastFailed";

export default function ContactForm() {
  const sendMessage = (e) => {
    if (
      e.target.name.value &&
      e.target.mail.value &&
      e.target.phone.value &&
      e.target.message.value
    ) {
      fetch("https://mineraux83-api.vercel.app/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: e.target.name.value,
          mail: e.target.mail.value,
          phone: e.target.phone.value,
          message: e.target.message.value,
        }),
      })
        .then(() => {
          showToast();
        })
        .catch((err) => {
          console.log({ err });
          showToastFailed();
        });
    } else {
      showToastFailed();
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e.target.name.value);

        sendMessage(e);
      }}
      className="contactMeForm"
    >
      <label htmlFor="name">Votre Nom*</label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Ex. Michel Dupont"
        autoComplete="name"
      />
      <label htmlFor="mail">Adresse Email*</label>
      <input
        id="mail"
        type="mail"
        name="mail"
        placeholder="exemple@exemple.com"
        autoComplete="email"
      />
      <label htmlFor="phone">Numéro de Téléphone*</label>
      <input
        id="phone"
        type="phone"
        name="phone"
        placeholder="+336 12 34 56 78"
        autoComplete="tel"
      />

      <label htmlFor="message">Votre Message*</label>
      <textarea
        id="message"
        name="message"
        placeholder="Votre message ..."
      ></textarea>
      <button>Envoyer un message</button>
      <ToastFailed> Champs obligatoires !</ToastFailed>
      <Toast>Message envoyé !</Toast>
    </form>
  );
}
