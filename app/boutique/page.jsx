import React from "react";
import FilterSection from "../ui/Pages/Boutique/filterSection/filterSection";
import ProductCard from "../ui/Pages/Boutique/Productcard/ProductCard";
import Head1 from "../ui/Components/head1/Head1";

export default function page() {
  return (
    <React.Fragment>
      <Head1>Notre boutique</Head1>
      <section className="boutiqueSection">
        <FilterSection />
        <div className="boutiqueProducts">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </section>
    </React.Fragment>
  );
}
