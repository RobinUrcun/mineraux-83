"use client";
import React from "react";
import Head1 from "../ui/Components/head1/Head1";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function layout({ children }) {
  const router = useRouter();
  const [userDonee, setUserDonnee] = useState("");

  useEffect(() => {
    const fetchDonnee = async function () {
      await fetch(
        `http://localhost:3001/api/user/info/${localStorage.getItem(
          "userInfoUserId"
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
          },
        }
      )
        .then((response) =>
          response.json().then((data) => {
            setUserDonnee(data.user);
          })
        )
        .catch((error) => console.log(error));
    };
    fetchDonnee();
  }, []);
  if (userDonee.role == "ADMIN") {
    return (
      <section className="sectionAdmin">
        <Head1>Administration</Head1>
        <div className="sectionAdminWrapper">
          <nav>
            <Link href="/admin/gerer">Gerrer mes Pierres</Link>
            <Link href="/admin/creer">Ajouter une Pierre</Link>
          </nav>
          {children}
        </div>
      </section>
    );
  }
}
