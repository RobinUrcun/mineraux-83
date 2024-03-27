"use client";
export function addToCart() {
  fetch("http://localhost:3001/api/user/cart/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
    },
    body: JSON.stringify({
      articleId: "test2",
    }),
  });
}
