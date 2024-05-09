"use client";
import React from "react";
import Head1 from "../ui/Components/head1/Head1";
import Cart from "../ui/Pages/Cart/Cart";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "@/app/utils/context/userContext";
import Link from "next/link";
import Loader from "../ui/Components/Loader/Loader";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [productCart, setProductCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0);

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
            if (response.status === 401) {
              router.push("/erreur");
            } else {
              response
                .json()
                .then((data) => setProductCart(data))
                .catch((error) => console.log(error));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
      fetchData();
    } else {
      const ParseLsPanier = !localStorage.getItem("panier")
        ? []
        : JSON.parse(localStorage.getItem("panier"));
      if (ParseLsPanier.length >= 1) {
        const productsIds = ParseLsPanier.join(",");
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
      } else {
        setProductCart([]);
      }
    }
  }, [userInfo]);

  useEffect(() => {
    const newTotalcart = productCart.reduce(
      (total, produit) => total + produit.price,
      0
    );
    setTotalCart(newTotalcart);
  }, [productCart]);

  const onRemove = (productId) => {
    const filteredProducts = productCart.filter(
      (product) => product._id != productId
    );

    setProductCart(filteredProducts);
  };
  return (
    <section className="cartSection">
      <Head1>Votre panier</Head1>
      <article className="cartSectionWrapper">
        {userInfo.isUserConnected === null ? (
          <Loader></Loader>
        ) : (
          productCart.map((product) => (
            <Cart
              key={product._id}
              product={product}
              onRemove={onRemove}
              userInfo={userInfo}
            />
          ))
        )}
        <div className="cartSectionTotal">
          Total :{" "}
          {(totalCart / 100).toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
          })}
        </div>
        {!userInfo.isUserConnected ? (
          <Link href="/login" className="button">
            Se connecter et payer
          </Link>
        ) : productCart.length >= 1 ? (
          <Link href="/commande" className="button">
            Payer
          </Link>
        ) : (
          <Link href="/boutique" className="button">
            Boutique
          </Link>
        )}
      </article>
    </section>
  );
}
