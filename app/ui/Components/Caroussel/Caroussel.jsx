"use client";

import { useState } from "react";
import React from "react";
import Image from "next/image";

export default function Caroussel({ imgUrl, name }) {
  const [counter, setCounter] = useState(0);

  const nextPicture = function () {
    if (counter === 0) {
      const newCounter = imgUrl.length - 1;
      setCounter(newCounter);
    } else {
      const newCounter = counter - 1;
      setCounter(newCounter);
    }
  };
  const previousPicture = function () {
    if (counter === imgUrl.length - 1) {
      const newCounter = 0;
      setCounter(newCounter);
    } else {
      const newCounter = counter + 1;
      setCounter(newCounter);
    }
  };

  return (
    <div className="caroussel">
      <div className="carousselImg">
        <img
          src={`https://lithosphere83-bucket.s3.eu-west-3.amazonaws.com/upload/${imgUrl[counter]}`}
          alt={name}
        />

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
  );
}
