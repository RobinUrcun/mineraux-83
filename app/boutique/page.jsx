"use client";
import React from "react";
import FilterSection from "../ui/Pages/Boutique/filterSection/filterSection";
import ProductCard from "../ui/Pages/Boutique/Productcard/ProductCard";
import Head1 from "../ui/Components/head1/Head1";

import { useState, useEffect } from "react";

export default function page() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async function () {
      fetch("http://localhost:3001/api/product")
        .then((response) => {
          console.log(response);
          response.json().then((data) => {
            console.log(data);
            setProducts(data);
          });
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);
  return (
    <React.Fragment>
      <Head1>Notre boutique</Head1>
      <section className="boutiqueSection">
        <FilterSection />
        <div className="boutiqueProducts">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </React.Fragment>
  );
}
