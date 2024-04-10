"use client";

import React from "react";
import Head1 from "../ui/Components/head1/Head1";
import Summary from "../ui/Pages/Commande/Summary/Summary";
import Address from "../ui/Pages/Commande/Address/Address";
import { useContext } from "react";
import { UserContext } from "@/app/utils/context/userContext";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import CommandeContextProvider from "../utils/context/commandeContextProvider";
import CommandeResume from "../ui/Pages/Commande/Resume/CommandeResume";

export default function page() {
  const router = useRouter();

  const { userInfo, setUserInfo } = useContext(UserContext);
  if (userInfo.isUserConnected === true) {
    return (
      <React.Fragment>
        <CommandeContextProvider>
          <Head1>Ma commande</Head1>

          <section className="commandeSection">
            <div className="commandeSummaryAdressWrapper">
              <Summary />
              <Address />
            </div>
            <CommandeResume />
          </section>
        </CommandeContextProvider>
      </React.Fragment>
    );
  } else if (userInfo.isUserConnected === null) {
    return <Loading></Loading>;
  } else {
    router.push("/erreur");
  }
}
