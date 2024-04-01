"use client";
import React from "react";
import Head1 from "../ui/Components/head1/Head1";
import Cart from "../ui/Pages/Cart/Cart";
import Button from "../ui/Components/Button/Button";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "@/app/utils/context/userContext";

export default function page() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [productCart, setProductCart] = useState([]);

  useEffect(() => {
    if (userInfo.isUserConnected) {
      const fetchData = async function () {
        await fetch("http://localhost:3001/api/user/cart", {
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
    } else {
      const lsPanier = localStorage.getItem("panier");
      console.log(lsPanier);
      const ParseLsPanier =
        lsPanier === null ? [] : JSON.parse(localStorage.getItem("panier"));
      console.log(ParseLsPanier);
      if (ParseLsPanier.length >= 1) {
        const productsIds = ParseLsPanier.join(",");
        console.log(productsIds);
        const fetchData = async function () {
          await fetch(`http://localhost:3001/api/product/${productsIds}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              response.json().then((data) => setProductCart(data));
            })
            .catch((err) => console.log(err));
        };
        fetchData();
        // setProductCart(ParseLsPanier);
      }
    }
  }, [userInfo]);

  console.log(productCart);
  const onRemove = (productId) => {
    const filteredProducts = productCart.filter(
      (product) => product._id != productId
    );

    setProductCart(filteredProducts);
  };

  console.log(productCart);
  return (
    <section className="cartSection">
      <Head1>Votre panier</Head1>
      <article className="cartSectionWrapper">
        {productCart.map((product) => (
          <Cart
            key={product._id}
            product={product}
            onRemove={onRemove}
            userInfo={userInfo}
          />
        ))}
        <div className="cartSectionTotal">Total : 120.00€</div>
        <Button>Payer</Button>
      </article>
    </section>
  );
}
