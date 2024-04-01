export function addToCart(article, userInfo) {
  console.log(userInfo);
  if (userInfo.isUserConnected == true) {
    fetch("http://localhost:3001/api/user/cart/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("userInfoToken")}`,
      },
      body: JSON.stringify({
        articleId: article,
      }),
    });
    console.log("ajotué");
  } else {
    let lsPanier = !localStorage.getItem("panier")
      ? []
      : JSON.parse(localStorage.getItem("panier"));
    console.log(lsPanier);
    lsPanier.includes(article)
      ? console.log("deja inclue")
      : lsPanier.push(article),
      console.log(lsPanier);
    console.log(lsPanier);
    const panierJSON = JSON.stringify(lsPanier);
    localStorage.setItem("panier", panierJSON);
  }
}
