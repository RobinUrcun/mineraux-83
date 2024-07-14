"use client";

import React, { useEffect, useState } from "react";

export default function ConfirmationResume() {
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

  return (
    <p>
      Vous receverez votre facture sous 48h à l'adresse suivante :{" "}
      <span className="orderId">{userData.email}</span>
    </p>
  );
}
