import React from "react";
import Image from "next/image";

export default function CardPictures({ picture, typeOfFile, data, setData }) {
  const deletePicture = () => {
    if (typeOfFile === "file") {
      console.log("requete envoyé");
      fetch("http://localhost:3001/api/product/singlePicture", {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          typeOfFile: typeOfFile,
          pictureKey: picture,
          dataId: data._id,
        }),
      })
        .then(() => {
          const newFiles = data.file.filter((url) => {
            return url !== picture;
          });
          setData({ ...data, file: newFiles });
        })
        .catch((error) => {
          console.log(error);
          // setIsLoading(false);
        });

      const newFiles = data.file.filter((url) => {
        return url !== picture;
      });
      setData({ ...data, file: newFiles });
    }
    if (typeOfFile === "mainFile") {
      fetch("http://localhost:3001/api/product/singlePicture", {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          typeOfFile: typeOfFile,
          pictureKey: picture,
          dataId: data._id,
        }),
      })
        .then(() => {
          console.log("fonctionne");
          setData({ ...data, mainFile: [] });
        })
        .catch((error) => {
          console.log(error);
          // setIsLoading(false);
        });
    }
  };
  return (
    <div className="pictureWrapper">
      <img
        className="picture"
        src={`https://lithosphere83-bucket.s3.eu-west-3.amazonaws.com/upload/${picture}`}
        alt=""
      />
      <div
        className="pictureDelete"
        onClick={() => {
          console.log(typeOfFile);
          deletePicture();
        }}
      >
        <Image
          src={"/form/logo_disconect.png"}
          width={30}
          height={30}
          alt="Retirer l'image"
        ></Image>
      </div>
    </div>
  );
}
