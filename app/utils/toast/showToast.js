export default function showToast() {
  let toast = document.getElementById("toast");
  toast.className = "toast succes";
  setTimeout(function () {
    toast.className = "toast";
  }, 3000);
}
