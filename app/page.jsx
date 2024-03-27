import Image from "next/image";
import HomeFirstSection from "./ui/Pages/Home/HomeFirstSection";
import HomePresentationSection from "./ui/Pages/Home/HomePresentationSection";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <HomeFirstSection></HomeFirstSection>
      <HomePresentationSection></HomePresentationSection>
    </React.Fragment>
  );
}
