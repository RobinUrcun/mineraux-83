"use client";
import React from "react";
import FilterSection from "../ui/Pages/Boutique/filterSection/filterSection";
import ProductCard from "../ui/Pages/Boutique/Productcard/ProductCard";
import Head1 from "../ui/Components/head1/Head1";
import Loader from "../ui/Components/Loader/Loader";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function page() {
  const router = useRouter();
  const [products, setProducts] = useState(null);
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
}
