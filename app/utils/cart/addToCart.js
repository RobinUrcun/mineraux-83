export function addToCart(article, userInfo) {
  if (userInfo.isUserConnected == true) {
    fetch("https://mineraux83-api.vercel.app/api/user/cart/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
      },
      body: JSON.stringify({
        articleId: article,
      }),
    });
  } else {
    let lsPanier = !localStorage.getItem("panier")
      ? []
      : JSON.parse(localStorage.getItem("panier"));
    lsPanier.includes(article) ? null : lsPanier.push(article);
    const panierJSON = JSON.stringify(lsPanier);
    localStorage.setItem("panier", panierJSON);
  }
}
