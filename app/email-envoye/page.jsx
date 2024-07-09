import React from "react";
import Head1 from "../ui/Components/head1/Head1";
import Link from "next/link";

export default function page() {
  return (
    <section className="emailSentSection">
      <Head1>Email envoyé avec succès !</Head1>
      <article className="emailSentArticle">
        <p>
          Un email de réinitialisation de mot de passe a été envoyé à votre
          adresse email. Veuillez vérifier votre boîte de réception et suivre
          les instructions pour réinitialiser votre mot de passe.
        </p>
        <br />
        <p>
          Si vous ne recevez pas l'email dans quelques minutes, veuillez
          vérifier votre dossier de spam ou{" "}
          <Link href="/mot-de-passe-oublie">réessayer</Link>.
        </p>
      </article>
    </section>
  );
}
