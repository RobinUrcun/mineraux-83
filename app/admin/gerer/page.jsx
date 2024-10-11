"use client";

import React from "react";
import CardGestion from "@/app/ui/Components/Card/CardGestion";
import { useState, useEffect } from "react";
import { fetchAllData } from "@/app/utils/fetchs/fetchAllProduct";
import FilterSelection from "@/app/ui/Pages/Boutique/FilterSelection/FilterSelection";

export default function page() {
  const [page, setPage] = useState(1);

  const loadMoreProduct = function () {
    const url = `https://mineraux83-api.vercel.app/api/product?page=${
      products.page + 1
    }${products.filter ? `&name=${products.filter}` : null}${
      products.sort ? `&sort=${products.sort}` : ""
    }`;

    fetchAllData(url, null)
      .then((data) => {
        const newlist = [...products.productList, data.stones];
        setProducts({
          ...products,
          productList: [...products.productList, ...data.stones],
          page: products.page + 1,
        });
      })
      .catch(() => {
        setProducts({ ...products, productList: [] });
      });
  };
  const [products, setProducts] = useState({
    productList: [],
    page: 1,
    filter: null,
    sort: "new",
  });
  useEffect(() => {
    const url = `https://mineraux83-api.vercel.app/api/product?page=${
      products.page
    }${products.filter ? `&name=${products.filter}` : null}${
      products.sort ? `&sort=${products.sort}` : ""
    }`;
    // const url = `https://mineraux83-api.vercel.app/api/product?page=${page}`;
    fetchAllData(url, null)
      .then((data) => {
        setProducts({ ...products, productList: data.stones });
      })
      .catch(() => {
        setProducts({ ...products, productList: [] });
      });
  }, [products.filter, products.sort]);
  useEffect(() => {
    if (products.productList.length > 8) {
      document
        .getElementById("manageProductWrapper")
        .scrollBy({ top: 2000, behavior: "smooth" });
    }
  }, [products.productList]);
  return (
    <article className="manageProduct">
      <FilterSelection products={products} setProducts={setProducts} />
      <div className="manageProductWrapper" id="manageProductWrapper">
        {products.productList.map((product) => (
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
