import React from "react";
import Head1 from "../ui/Components/head1/Head1";
import Link from "next/link";

export default function page() {
  return (
    <section className="resetPasswordSuccessSection">
      <Head1>Mot de passe mis à jour.</Head1>
      <article className="resetPasswordSuccessArticle">
        <p>
          Votre mot de passe a été modifié avec succès. Vous pouvez maintenant
          vous connecter avec votre nouveau mot de passe. Cliquez sur le bouton
          ci-dessous pour accéder à la page de connexion.
        </p>
        <Link href={"/login"}>Se connecter</Link>
      </article>
    </section>
  );
}
