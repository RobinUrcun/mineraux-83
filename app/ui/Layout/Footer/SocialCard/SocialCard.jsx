import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function SocialCard({ href, alt, imgUrl }) {
  return (
    <div className="footerSocialLogo">
      <Link href={href}>
        <Image src={imgUrl} width={30} height={30} alt={alt} />
      </Link>
    </div>
  );
}
