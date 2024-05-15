import React from "react";
import Link from "next/link";
import Toast from "../Toast/Toast";
import ToastFailed from "../Toast/ToastFailed";
import showToast from "@/app/utils/toast/showToast";
import showToastFailed from "@/app/utils/toast/showToastFailed";

export default function CardGestion({ product, products, setProducts }) {
  const deleteProduct = function (e) {
    e.preventDefault();
    fetch(`http://localhost:3001/api/product/singleProduct/${product._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
      },
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          const filterProducts = products.filter((singleProduct) => {
            return singleProduct._id !== product._id;
          });
          setProducts(filterProducts);
          showToast();
        } else {
          showToastFailed();
        }
      })
      .catch((error) => {
        showToastFailed();
      });
  };
  return (
    <div className="productCard">
      <div className="productCardImgCont">
        <img
          src={`https://lithosphere83-bucket.s3.eu-west-3.amazonaws.com/upload/${product.mainFile}`}
          alt="ok"
          className="productCardImg"
        />
      </div>
      <div className="productCardInfo">
        <h3 className="productCardName">{product.title}</h3>

        <div className="productManage">
          <form>
            <Link href={`/admin/gerer/${product._id}`}>Modifer</Link>
          </form>
          <form onSubmit={deleteProduct}>
            <button>Supprimer</button>
          </form>
          <Link href={`/admin/creer/${product._id}`}>Produit similaire</Link>
        </div>
      </div>
      <Toast>Produit supprimé</Toast>
      <ToastFailed>Impossible de supprimer</ToastFailed>
    </div>
  );
}
