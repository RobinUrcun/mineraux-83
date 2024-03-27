"use client";
import React from "react";
import Head1 from "../ui/Components/head1/Head1";
import Cart from "../ui/Pages/Cart/Cart";
import Button from "../ui/Components/Button/Button";
import { useState, useEffect } from "react";

export default function page() {
  const [productCart, setProductCart] = useState([]);
  useEffect(() => {
    const fetchData = async function () {
      await fetch("http://localhost:3001/api/product/user/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
        },
      })
        .then((response) => {
          response.json().then((data) => setProductCart(data));
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  console.log(productCart);
  return (
    <section className="cartSection">
      <Head1>Votre panier</Head1>
      <article className="cartSectionWrapper">
        {productCart.map((product) => (
          <Cart key={product._id} product={product} />
        ))}
        <div className="cartSectionTotal">Total : 120.00€</div>
        <Button>Payer</Button>
      </article>
    </section>
  );
}
