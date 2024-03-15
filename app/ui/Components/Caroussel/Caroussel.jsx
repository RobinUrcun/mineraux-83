import React from "react";
import Image from "next/image";

export default function Caroussel() {
  return (
    <div className="caroussel">
      <div className="carousselImg">
        <Image
          src="/assets/geode2.png"
          width={400}
          height={500}
          alt="logement"
        />

        <div
          //   onClick={previousPicture}
          className=" caroussel_arrow arrow_before"
        >
          <Image
            src="/form/arrow_before.webp"
            width={24}
            height={40}
            alt="précedent"
          />
        </div>
        <div
          // onClick={nextPicture}
          className="caroussel_arrow arrow_after"
        >
          <Image
            src="/form/arrow_after.webp"
            width={24}
            height={40}
            alt="suivant"
          />
        </div>
      </div>
    </div>
  );
}
