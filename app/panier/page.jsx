import React from "react";
import Head1 from "../ui/Components/head1/Head1";
import Cart from "../ui/Pages/Cart/Cart";
import Button from "../ui/Components/Button/Button";

export default function page() {
  return (
    <section className="cartSection">
      <Head1>Votre panier</Head1>
      <article className="cartSectionWrapper">
        <Cart />
        <Cart />
        <div className="cartSectionTotal">Total : 120.00€</div>
        <Button>Payer</Button>
      </article>
    </section>
  );
}
