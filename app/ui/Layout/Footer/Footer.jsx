import React from "react";
import SocialCard from "./SocialCard/SocialCard";
import Nav from "../../Components/Nav/Nav";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerSocial">
        <SocialCard
          href="facebook.com"
          alt="visitez nous sur Facebook"
          imgUrl="/assets/icone/social/facebook.png"
        />
        <SocialCard
          href="www.twitter.com"
          alt="visitez nous sur Twitter"
          imgUrl="/assets/icone/social/twitter.png"
        />
        <SocialCard
          href="www.instagram.com"
          alt="visitez nous sur Instagram"
          imgUrl="/assets/icone/social/instagram.png"
        />
      </div>
      <Nav section="footer" />
    </footer>
  );
}
