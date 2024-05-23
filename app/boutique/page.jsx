"use client";
import React, { use } from "react";
import FilterSection from "../ui/Pages/Boutique/FilterSection/FilterSection";
import ProductCard from "../ui/Pages/Boutique/Productcard/ProductCard";
import Head1 from "../ui/Components/head1/Head1";
import Loader from "../ui/Components/Loader/Loader";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Toast from "@/app/ui/Components/Toast/Toast";
import { fetchAllData } from "../utils/fetchs/fetchAllProduct";

export default function page() {
  const router = useRouter();
  const [products, setProducts] = useState(null);
  const [filter, setFilter] = useState("new");
  const [page, setPage] = useState(1);

  const loadMoreProduct = function () {
    const url = `http://localhost:3001/api/product?page=${page + 1}`;

    fetchAllData(url, null)
      .then((data) => {
        const productList = products;

        for (let index = 0; index < data.stones.length; index++) {
          productList.push(data.stones[index]);
        }
        console.log(productList);
        setProducts(productList);
        setPage(page + 1);
      })
      .catch(() => {
        setProducts("error");
      });
  };
  useEffect(() => {
    const url = `http://localhost:3001/api/product?page=${page}`;

    fetchAllData(url, null)
      .then((data) => {
        setProducts(data.stones);
      })
      .catch(() => {
        setProducts("error");
      });
  }, []);
  console.log(products);

  if (products === null) {
    return <Loader />;
  } else if (products === "error") {
    router.push("/erreur");
  } else {
    let sortedProducts = [...products];

    if (filter === "ascending") {
      sortedProducts.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (filter === "decreasing") {
      sortedProducts.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (filter === "new") {
      sortedProducts = [...products];
    } else {
      sortedProducts = sortedProducts.filter((product) =>
        product.title.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return (
      <React.Fragment>
        <Head1>Notre boutique</Head1>
        <section className="boutiqueSection">
          <FilterSection filter={filter} setFilter={setFilter} />
          <div className="boutiqueProducts">
            {sortedProducts.map((product) => (
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
      </React.Fragment>
    );
  }
}
