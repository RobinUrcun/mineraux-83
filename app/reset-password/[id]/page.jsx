import Head1 from "@/app/ui/Components/head1/Head1";
import React from "react";
import ResetPasswordForm from "@/app/ui/Pages/ResetPassword/ResetPasswordForm/ResetPasswordForm";

export default function page() {
  return (
    <section className="resetPasswordSection">
      <Head1>Reinitialisation du mot de passe</Head1>
      <article className="resetPasswordArticle">
        <ResetPasswordForm />
      </article>
    </section>
  );
}
