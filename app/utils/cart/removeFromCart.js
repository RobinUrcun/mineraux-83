export function removeFromCart(productId, userInfo) {
  if (userInfo.isUserConnected) {
    fetch("https://mineraux83-api.vercel.app/api/user/cart/", {
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
