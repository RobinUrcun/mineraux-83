export default function showToastFailed() {
  let toast = document.getElementById("toastFailed");
  console.log(toast);
  toast.className = `toast failed`;
  setTimeout(function () {
    toast.className = "toast";
  }, 3000);
}
