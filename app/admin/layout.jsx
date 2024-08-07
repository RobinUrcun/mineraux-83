"use client";
import React from "react";
import Head1 from "../ui/Components/head1/Head1";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../utils/context/userContext";
import { useRouter } from "next/navigation";
import Loader from "../ui/Components/Loader/Loader";

export default function layout({ children }) {
  const router = useRouter();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [userDonee, setUserDonnee] = useState(null);

  useEffect(() => {
    const fetchDonnee = async function () {
      await fetch(`https://mineraux83-api.vercel.app/api/user/role/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              setUserDonnee(data.role);
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
          console.log(error);
          setUserDonnee("error");
        });
    };
    fetchDonnee();
  }, []);
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
  } else {
    router.push("/erreur");
  }
}
