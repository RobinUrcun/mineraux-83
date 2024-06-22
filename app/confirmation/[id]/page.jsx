import React from "react";
import Head1 from "../../ui/Components/head1/Head1";
import OrderNumber from "../../ui/Pages/Confirmation/OrderNumber/OrderNumber";
import ConfirmationResume from "@/app/ui/Pages/Confirmation/ConfirmationResume/ConfirmationResume";

export default function page() {
  return (
    <section>
      <Head1>Félicitation !</Head1>
      <div className="orderInfo">
        <OrderNumber />
        <ConfirmationResume />
      </div>
    </section>
  );
}
