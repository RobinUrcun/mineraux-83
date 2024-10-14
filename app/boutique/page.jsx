"use client";
import React from "react";

import ProductCard from "../ui/Pages/Boutique/Productcard/ProductCard";
import Loader from "../ui/Components/Loader/Loader";
import FilterSelection from "../ui/Pages/Boutique/FilterSelection/FilterSelection";
import Head1 from "../ui/Components/head1/Head1";
import Categories from "../ui/Pages/Boutique/Categories/Categories";
import { useState, useEffect } from "react";
import Toast from "@/app/ui/Components/Toast/Toast";
import { fetchAllData } from "../utils/fetchs/fetchAllProduct";

export default function page() {
  const [isCategoriesDisplay, setIsCategoriesDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState({
    productList: [],
    page: 1,
    filter: null,
    sort: "new",
    categorie: null,
  });
  console.log(products);

  //  //
  useEffect(() => {
    setIsLoading(true);
    const url = `https://mineraux83-api.vercel.app/api/product?page=${
      products.page
    }${products.filter ? `&name=${products.filter}` : ""}${
      products.sort ? `&sort=${products.sort}` : ""
    }${products.categorie ? `&categorie=${products.categorie}` : ""}`;

    fetchAllData(url, null)
      .then((data) => {
        setProducts({ ...products, productList: data.stones });
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);

        setProducts({ ...products, productList: [] });
      });
  }, [products.filter, products.sort, products.categorie]);
  const loadMoreProduct = function () {
    const url = `https://mineraux83-api.vercel.app/api/product?page=${
      products.page + 1
    }${products.filter ? `&name=${products.filter}` : ""}${
      products.sort ? `&sort=${products.sort}` : ""
    }${products.categorie ? `&categorie=${products.categorie}` : ""}`;

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
  return (
    <section className="boutiqueSection">
      <Head1>Notre boutique</Head1>
      <FilterSelection
        products={products}
        isCategoriesDisplay={isCategoriesDisplay}
        setIsCategoriesDisplay={setIsCategoriesDisplay}
        setProducts={setProducts}
      />
      <Categories
        isCategoriesDisplay={isCategoriesDisplay}
        products={products}
        setProducts={setProducts}
      />
      <div className="boutiqueProducts">
        {isLoading ? (
          <Loader />
        ) : !products.productList.length ? (
          <p> aucun produits</p>
        ) : (
          products.productList.map((product, index) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
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
