"use client";

import React from "react";
import { useEffect, useContext, useState } from "react";
import { MondialWidget } from "@/app/utils/mondialRelay/mondialRelay";
import { CommandeContext } from "@/app/utils/context/commandeContextProvider";
export default function MondialRelayWidget() {
  const { deliveryInfo, setDeliveryInfo } = useContext(CommandeContext);

  useEffect(() => {
    console.log("widget rerender");
    MondialWidget(setDeliveryInfo, deliveryInfo);
  }, []);
  return (
    <div className="widgetWrapper">
      <div id="Zone_Widget"></div>
    </div>
  );
}
