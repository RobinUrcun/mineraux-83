import React from "react";
import Head1 from "../ui/Components/head1/Head1";
import Image from "next/image";

export default function page() {
  return (
    <React.Fragment>
      <Head1>Nous contacter</Head1>
      <section className="contactSection">
        <article className="contactArticle">
          <div className="contactImgWrapper">
            <Image
              src="/form/logoPhone.png"
              height={100}
              width={100}
              alt="Contactez nous par téléphone"
            />
          </div>
          <p>Contacter nous du Lundi au Samedi de 9h00 à 18h00 au :</p>
          <div className="contactArticleWrapper">
            <a href="tel:0612345678">0612345678</a>
          </div>
        </article>

        <article className="contactArticle">
          <div className="contactImgWrapper">
            <Image
              src="/form/logoMail.png"
              height={100}
              width={100}
              alt="Contactez nous par e-mail"
            />
          </div>
          <p>Écrivez nous directement par mail a l'adresse suivante : </p>
          <div className="contactArticleWrapper">
            <a href="mailto:AdresseMail@gmail.com">AdresseMail@gmail.com</a>
          </div>
        </article>
      </section>
    </React.Fragment>
  );
}
