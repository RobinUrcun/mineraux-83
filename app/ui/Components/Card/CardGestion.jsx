import React from "react";
import Link from "next/link";

export default function CardGestion() {
  return (
    <div className="productCard">
      <div className="productCardImgCont">
        <img
          src="/assets/exempleCard.png"
          alt="ok"
          className="productCardImg"
        />
      </div>
      <div className="productCardInfo">
        <h2 className="productCardName">Diorite</h2>

        <div className="productManage">
          <form>
            <Link href="/admin/gerer/:id">Modifer</Link>
          </form>
          <form>
            <button>Supprimer</button>
          </form>
        </div>
      </div>
    </div>
  );
}
