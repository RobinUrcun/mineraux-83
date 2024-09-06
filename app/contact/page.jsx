import React from "react";
import Image from "next/image";
import ContactForm from "../ui/Components/ContactForm/ContactForm";
import Head1 from "../ui/Components/head1/Head1";

export default function page() {
  return (
    <React.Fragment>
      <Head1>Contactez moi</Head1>
      <section id="contact" className="contactMeSection">
        <div className="contactMeText">
          <div className="contactMeInfo">
            <a href="tel: +337 50 51 29 56" className="contactMeInfoWrapper">
              <div className="contactMeImgBorder">
                <Image
                  src={"/assets/icone/contact/callLogo.svg"}
                  height={40}
                  width={40}
                  alt="Lien pour téléphoner"
                />
              </div>
              <p>+ 33X XX XX XX XX</p>
            </a>
            <a
              href="mailto:robinurcun@gmail.com"
              className="contactMeInfoWrapper"
            >
              <div className="contactMeImgBorder">
                <Image
                  src={"/assets/icone/contact/mailLogo.svg"}
                  height={40}
                  width={40}
                  alt="Lien pour envoyer un mail"
                />
              </div>
              <p>xxxxxxxxxxxxx@gmail.com</p>
            </a>
            <div className="contactMeInfoWrapper">
              <div className="contactMeImgBorder">
                <Image
                  src={"/assets/icone/contact/positionLogo.svg"}
                  height={40}
                  width={40}
                  alt="Ma localisation"
                />
              </div>
              <p>Aups, VAR</p>
            </div>
          </div>
        </div>
        <ContactForm />
      </section>
    </React.Fragment>
  );
}
