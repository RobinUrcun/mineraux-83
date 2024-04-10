"use client";

import React from "react";
import CardGestion from "@/app/ui/Components/Card/CardGestion";
import { useState, useEffect } from "react";

export default function page() {
  const [productsManage, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async function () {
      await fetch("http://localhost:3001/api/product").then((response) => {
        console.log(response);
        response.json().then((data) => {
          console.log(data);
          setProducts(data);
        });
      });
    };
    fetchData();
  }, []);
  return (
    <article className="manageProduct">
      {productsManage.map((product) => (
        <CardGestion product={product} />
      ))}
    </article>
  );
}
