export function removeFromCart(productId, userInfo) {
  console.log(userInfo);
  if (userInfo.isUserConnected) {
    fetch("http://localhost:3001/api/user/cart/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
      },
      body: JSON.stringify({
        articleId: productId,
      }),
    });
  } else {
    const lsPanier = JSON.parse(localStorage.getItem("panier"));
    const newLsPanier = JSON.parse(localStorage.getItem("panier")).filter(
      (product) => product != productId
    );
    localStorage.setItem("panier", JSON.stringify(newLsPanier));
  }
}