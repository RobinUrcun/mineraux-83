"use client";

import React from "react";
import CardGestion from "@/app/ui/Components/Card/CardGestion";
import { useState, useEffect } from "react";
import { fetchAllData } from "@/app/utils/fetchs/fetchAllProduct";

export default function page() {
  const [page, setPage] = useState(1);

  const loadMoreProduct = async function () {
    const url = `https://mineraux83-api.vercel.app/api/product?page=${
      page + 1
    }`;

    await fetchAllData(url, null)
      .then((data) => {
        setProducts((prevProducts) => [...prevProducts, ...data.stones]);
        setPage(page + 1);
      })
      .catch(() => {
        setProducts("error");
      });
  };

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const url = `https://mineraux83-api.vercel.app/api/product?page=${page}`;
    fetchAllData(url, null).then((data) => {
      setProducts(data.stones);
    });
  }, []);
  useEffect(() => {
    if (products.length > 8) {
      document
        .getElementById("manageProductWrapper")
        .scrollBy({ top: 2000, behavior: "smooth" });
    }
  }, [products]);
  return (
    <article className="manageProduct">
      <div className="manageProductWrapper" id="manageProductWrapper">
        {products.map((product) => (
          <CardGestion
            product={product}
            products={products}
            setProducts={setProducts}
            key={product._id}
          />
        ))}
      </div>
      <form
        className="loadMore"
        onSubmit={async (e) => {
          e.preventDefault();
          await loadMoreProduct();
        }}
      >
        <button>afficher plus</button>
      </form>
    </article>
  );
}
