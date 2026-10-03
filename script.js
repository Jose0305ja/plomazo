// Menú móvil: abre/cierra la navegación en pantallas angostas.
(function () {
  var b = document.querySelector('header button[aria-controls="mobile-nav"]');
  var n = document.getElementById("mobile-nav");
  if (!b || !n) return;
  function set(open) {
    n.hidden = !open;
    b.setAttribute("aria-expanded", String(open));
    b.querySelector(".sr-only").textContent = open ? "Cerrar menú" : "Abrir menú";
    b.querySelector("path").setAttribute(
      "d",
      open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16",
    );
  }
  b.addEventListener("click", function () { set(n.hidden); });
  n.addEventListener("click", function (e) { if (e.target.tagName === "A") set(false); });
})();
