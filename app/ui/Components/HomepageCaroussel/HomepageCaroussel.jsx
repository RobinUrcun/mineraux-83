"use client";

import React, { useState } from "react";
import Caroussel from "../Caroussel/Caroussel";
import Image from "next/image";

export default function HomepageCaroussel() {
  const imgList = [
    {
      imgName: "Une de mes réalisations",
      imgUrl: "/assets/homepagePicture/20240612_154702.jpg",
    },
    {
      imgName: "L'atelier",
      imgUrl: "/assets/homepagePicture/20240208_105421.jpg",
    },
    {
      imgName: "Mes réalisations",
      imgUrl: "/assets/homepagePicture/20240526_162216.jpg",
    },

    {
      imgName: "L'atelier",
      imgUrl: "/assets/homepagePicture/20240203_103057.jpg",
    },
  ];
  const [counter, setCounter] = useState(0);

  const nextPicture = function () {
    if (counter === 0) {
      const newCounter = imgList.length - 1;
      setCounter(newCounter);
    } else {
      const newCounter = counter - 1;
      setCounter(newCounter);
    }
  };
  const previousPicture = function () {
    if (counter === imgList.length - 1) {
      const newCounter = 0;
      setCounter(newCounter);
    } else {
      const newCounter = counter + 1;
      setCounter(newCounter);
    }
  };
  return (
    <article className="homepagePresentationCaroussel">
      <div className="caroussel">
        <div className="carousselImg">
          <img src={imgList[counter].imgUrl} alt={imgList[counter].imgName} />

          <div
            onClick={previousPicture}
            className=" caroussel_arrow arrow_before"
          >
            <Image
              src="/form/arrow_before.webp"
              width={24}
              height={40}
              alt="précedent"
            />
          </div>
          <div onClick={nextPicture} className="caroussel_arrow arrow_after">
            <Image
              src="/form/arrow_after.webp"
              width={24}
              height={40}
              alt="suivant"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
