"use client";
import React from "react";

import ProductCard from "../ui/Pages/Boutique/Productcard/ProductCard";
// import FilterSection from "@/app/ui/Pages/Boutique/FilterSection/FilterSection";
import FilterSelection from "../ui/Pages/Boutique/FilterSelection/FilterSelection";
import Head1 from "../ui/Components/head1/Head1";
import { useState, useEffect } from "react";
import Toast from "@/app/ui/Components/Toast/Toast";
import { fetchAllData } from "../utils/fetchs/fetchAllProduct";

export default function page() {
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

    fetchAllData(url, null)
      .then((data) => {
        setProducts({ ...products, productList: data.stones });
      })
      .catch(() => {
        setProducts({ ...products, productList: [] });
      });
  }, [products.filter, products.sort]);
  console.log(products);
  const loadMoreProduct = function () {
    const url = `https://mineraux83-api.vercel.app/api/product?page=${
      products.page + 1
    }`;

    fetchAllData(url, null)
      .then((data) => {
        const newlist = [...products.productList, data.stones];
        console.log(newlist);
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
  console.log(products);
  return (
    <section className="boutiqueSection">
      <Head1>Notre boutique</Head1>
      <FilterSelection products={products} setProducts={setProducts} />
      <div className="boutiqueProducts">
        {products.productList.map((product, index) => (
          <ProductCard key={product._id} product={product} />
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
      <Toast>Produit ajouté !</Toast>
    </section>
  );
}
