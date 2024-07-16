"use client";

import React from "react";
import CardGestion from "@/app/ui/Components/Card/CardGestion";
import { useState, useEffect } from "react";
import { fetchAllData } from "@/app/utils/fetchs/fetchAllProduct";

export default function page() {
  const [page, setPage] = useState(1);

  const loadMoreProduct = function () {
    const url = `https://mineraux83-api.vercel.app/api/product?page=${
      page + 1
    }`;

    fetchAllData(url, null)
      .then((data) => {
        const productList = products;

        for (let index = 0; index < data.stones.length; index++) {
          productList.push(data.stones[index]);
        }
        setProducts(productList);
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
  return (
    <article className="manageProduct">
      <div className="manageProductWrapper">
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
        onSubmit={(e) => {
          e.preventDefault();
          loadMoreProduct();
        }}
      >
        <button>afficher plus</button>
      </form>
    </article>
  );
}
