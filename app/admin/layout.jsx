"use client";
import React from "react";
import Head1 from "../ui/Components/head1/Head1";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "../ui/Components/Loader/Loader";

export default function layout({ children }) {
  const router = useRouter();
  const [userDonee, setUserDonnee] = useState(null);

  useEffect(() => {
    const fetchDonnee = async function () {
      await fetch(`http://localhost:3001/api/user/role/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
        },
      })
        .then((response) =>
          response.json().then((data) => {
            setUserDonnee(data.role);
          })
        )
        .catch((error) => {
          console.log(error);
          setUserDonnee("error");
        });
    };
    fetchDonnee();
  }, []);
  console.log(userDonee);

  if (userDonee === null) {
    return <Loader />;
  } else if (userDonee == "ADMIN") {
    return (
      <section className="sectionAdmin">
        <Head1>Administration</Head1>
        <div className="sectionAdminWrapper">
          <nav>
            <Link href="/admin/gerer">Gerer mes Pierres</Link>
            <Link href="/admin/creer">Ajouter une Pierre</Link>
            <Link href="/admin/mes-ventes">Mes ventes</Link>
          </nav>
          {children}
        </div>
      </section>
    );
  } else if (userDonee === "error") {
    router.push("/404");
  }
}
