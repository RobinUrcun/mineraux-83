"use client";

import React from "react";
import { useParams } from "next/navigation";

export default function OrderNumber() {
  const searchParams = useParams();
  const commandeId = searchParams.id;

  return (
    <p>
      Votre commande porte le numero{" "}
      <span className="orderId">{commandeId}</span>.
    </p>
  );
}
