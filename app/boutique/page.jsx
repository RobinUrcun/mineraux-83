"use client";
import React from "react";
import FilterSection from "../ui/Pages/Boutique/FilterSection/FilterSection";
import ProductCard from "../ui/Pages/Boutique/Productcard/ProductCard";
import Head1 from "../ui/Components/head1/Head1";
import Loader from "../ui/Components/Loader/Loader";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Toast from "@/app/ui/Components/Toast/Toast";

export default function page() {
  const router = useRouter();
  const [products, setProducts] = useState(null);
  const [filter, setFilter] = useState("new");
  useEffect(() => {
    const fetchData = async function () {
      fetch("http://localhost:3001/api/product")
        .then((response) => {
          response.json().then((data) => {
            setProducts(data);
          });
        })
        .catch((err) => {
          setProducts("error");
        });
    };
    fetchData();
  }, []);

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
      console.log(sortedProducts);
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
          <Toast>Produit ajouté !</Toast>
        </section>
      </React.Fragment>
    );
  }
}
