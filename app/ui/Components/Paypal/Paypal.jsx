"use client";

import React, { useContext, useRef, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CommandeContext } from "@/app/utils/context/commandeContextProvider";
import { useRouter } from "next/navigation";
import ToastFailed from "../Toast/ToastFailed";
import showToastFailed from "@/app/utils/toast/showToastFailed";
import { validName, validNumber } from "@/app/utils/regex/regex";

export default function Paypal() {
  const router = useRouter();
  const { deliveryInfo, commandeInfo } = useContext(CommandeContext);
  const deliveryInfoRef = useRef(deliveryInfo);
  const commandeInfoRef = useRef(commandeInfo);

  useEffect(() => {
    deliveryInfoRef.current = deliveryInfo;
    commandeInfoRef.current = commandeInfo;
  }, [deliveryInfo, commandeInfo]);
  console.log(deliveryInfoRef.current);

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
            if (
              deliveryInfoRef.current.deliveryCompany &&
              deliveryInfoRef.current.road &&
              deliveryInfoRef.current.CP &&
              deliveryInfoRef.current.city &&
              deliveryInfoRef.current.country &&
              validName.test(commandeInfoRef.current.userSurname) &&
              validName.test(commandeInfoRef.current.userName) &&
              validNumber.test(commandeInfoRef.current.phone)
            ) {
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
                showToastFailed();
              }
            } else {
              showToastFailed();
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

              const errorDetail = orderData?.details?.[0];
              console.log(errorDetail);

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                console.log("redirection NON payé???");
                showToastFailed();

                return actions.restart();
              } else if (errorDetail) {
                console.log("redirection ERREUR ???");
                showToastFailed();

                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`
                );
              } else {
                console.log("redirection OK ???");
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];
                router.push(`/confirmation/${transaction.id}`);

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
              showToastFailed();
            }
          }}
        />
      </PayPalScriptProvider>
      <ToastFailed>Champs manquants ou incorrects</ToastFailed>
    </div>
  );
}
