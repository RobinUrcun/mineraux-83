import React from "react";
import Link from "next/link";
import Toast from "../Toast/Toast";
import ToastFailed from "../Toast/ToastFailed";
import showToast from "@/app/utils/toast/showToast";
import showToastFailed from "@/app/utils/toast/showToastFailed";

export default function CardGestion({ product, products, setProducts }) {
  const deleteProduct = function (e) {
    e.preventDefault();
    fetch(
      `https://mineraux83-api.vercel.app/api/product/singleProduct/${product._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
        },
      }
    )
      .then((response) => {
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
        <h2 className="productCardName">{product.title}</h2>

        <div className="productManage">
          <div className="productManageDiv">
            <Link href={`/admin/gerer/${product._id}`}>Modifer</Link>
          </div>
          <form onSubmit={deleteProduct} className="productManageDiv">
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
