import React from "react";
import Link from "next/link";

export default function CardGestion({ product }) {
  return (
    <div className="productCard">
      <div className="productCardImgCont">
        <img src={product.image} alt="ok" className="productCardImg" />
      </div>
      <div className="productCardInfo">
        <h3 className="productCardName">{product.title}</h3>

        <div className="productManage">
          <form>
            <Link href={`/admin/gerer/${product._id}`}>Modifer</Link>
          </form>
          <form>
            <button>Supprimer</button>
          </form>
        </div>
      </div>
    </div>
  );
}
