"use client";

import React, { useContext, useRef, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CommandeContext } from "@/app/utils/context/commandeContextProvider";
import { useRouter } from "next/navigation";

export default function Paypal() {
  const router = useRouter();
  const { deliveryInfo, commandeInfo } = useContext(CommandeContext);
  const deliveryInfoRef = useRef(deliveryInfo);
  const commandeInfoRef = useRef(commandeInfo);

  // Synchronize refs with context values
  useEffect(() => {
    deliveryInfoRef.current = deliveryInfo;
    commandeInfoRef.current = commandeInfo;
  }, [deliveryInfo, commandeInfo]);

  const initialOptions = {
    "client-id":
      "AX9ZAE5E-lwDSHZilYEFTWCvBe8Tjq_o4TmK71jBPBafceVTK9YcObsN6nJNKfeyWc_m4_qsudKh5IKi",
    currency: "EUR",
    intent: "capture",
  };
  return (
    <div className="paypalWrapper">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          createOrder={async () => {
            try {
              const response = await fetch(
                "http://localhost:3001/api/user/orders",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem(
                      "userInfoToken"
                    )}`,
                  },
                  body: JSON.stringify({
                    deliveryInfo: deliveryInfoRef.current,
                  }),
                }
              );

              const orderData = await response.json();

              if (orderData.id) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);

                throw new Error(errorMessage);
              }
            } catch (error) {
              console.error(error);
            }
          }}
          onApprove={async (data, actions) => {
            console.log("data", data);
            try {
              const response = await fetch(
                `http://localhost:3001/api/user/orders/${data.orderID}/capture`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${localStorage.getItem(
                      "userInfoToken"
                    )}`,
                  },
                  body: JSON.stringify({
                    deliveryInfo: deliveryInfoRef.current,
                    commandeInfo: commandeInfoRef.current,
                  }),
                }
              );

              const orderData = await response.json();
              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you message

              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                console.log("redirection NON payé???");

                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
              } else if (errorDetail) {
                console.log("redirection ERREUR ???");

                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`
                );
              } else {
                console.log("redirection OK ???");
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];
                router.push(`/confirmation/${transaction.id}`);
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');

                console.log("transaction", transaction);
                console.log("transaction ID", transaction.id);

                console.log(
                  "Capture result",
                  orderData,
                  JSON.stringify(orderData, null, 2)
                );
              }
            } catch (error) {
              console.error(error);
            }
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
