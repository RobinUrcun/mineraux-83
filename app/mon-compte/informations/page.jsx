"use client";

import React from "react";
import Button from "@/app/ui/Components/Button/Button";
import { useState, useEffect } from "react";
import Loader from "@/app/ui/Components/Loader/Loader";
import { useRouter } from "next/navigation";

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
        .then((response) =>
          response.json().then((data) => {
            setUserData(data);
          })
        )
        .catch((error) => {
          console.log(error);
          setUserData("error");
        });
    };
    fetchData();
  }, []);
  console.log(userData);
  if (userData === null) {
    return <Loader />;
  } else if (userData === "error") {
    router.push("/error");
  } else {
    return (
      <article className="monCompteInformations">
        <h2>Mes informations</h2>
        <form>
          <div className="monCompteInformationsEmail">{userData.email}</div>
          <input
            type="text"
            placeholder="Nom"
            value={userData.name}
            onChange={(e) => {
              setUserData({ ...userData, name: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Prenom"
            value={userData.surname}
            onChange={(e) => {
              setUserData({ ...userData, surname: e.target.value });
            }}
          />
          <input type="password" placeholder="Mot de passe actuel" />
          <input type="password" placeholder="Nouveau mot de passe" />
          <input type="password" placeholder="Nouveau mot de passe" />
          <Button>Modifier</Button>
        </form>
      </article>
    );
  }
}
