export default function showToastFailed() {
  let toast = document.getElementById("toastFailed");
  toast.className = `toast failed`;
  setTimeout(function () {
    toast.className = "toast";
  }, 3000);
}
