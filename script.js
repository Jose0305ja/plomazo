// Interacciones del sitio: menú móvil, sombra de cabecera, aparición al hacer
// scroll, filtros (menú y galería), buscador de sucursales y visor de fotos.
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  /* Menú móvil */
  var toggle = $(".nav-toggle");
  var mobile = $("#mobile-nav");
  if (toggle && mobile) {
    var setOpen = function (open) {
      mobile.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      $(".sr-only", toggle).textContent = open ? "Cerrar menú" : "Abrir menú";
      $("path", toggle).setAttribute("d", open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16");
    };
    toggle.addEventListener("click", function () { setOpen(mobile.hidden); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !mobile.hidden) { setOpen(false); toggle.focus(); } });
    window.addEventListener("resize", function () { if (window.innerWidth >= 900) setOpen(false); });
  }

  /* Sombra de la cabecera al bajar */
  var header = $(".site-header");
  var onScroll = function () { if (header) header.classList.toggle("is-scrolled", window.scrollY > 8); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Aparecer al hacer scroll (con retraso escalonado entre hermanos) */
  var observed = new WeakSet();
  function watchReveals(root) {
    var items = $$(".reveal", root).filter(function (el) { return !observed.has(el); });
    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = $$(".reveal", el.parentElement);
        el.style.setProperty("--rd", Math.min(siblings.indexOf(el), 6) * 70 + "ms");
        el.classList.add("is-visible");
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (el) { observed.add(el); io.observe(el); });
  }
  watchReveals(document);

  /* Filtros de pastillas (menú y galería) */
  $$("[data-filter-group]").forEach(function (group) {
    var kind = group.getAttribute("data-filter-group");
    var pills = $$(".pill", group);
    var targets = kind === "menu" ? $$(".menu-cat") : $$(".gallery-item");
    function apply(value) {
      pills.forEach(function (p) { p.classList.toggle("is-active", p.getAttribute("data-filter") === value); });
      targets.forEach(function (t) {
        var show = value === "all" || t.getAttribute("data-category") === value;
        t.hidden = !show;
        if (show) $$(".reveal", t).concat(t.classList.contains("reveal") ? [t] : []).forEach(function (el) { el.classList.add("is-visible"); });
      });
      if (kind === "menu" && history.replaceState) history.replaceState(null, "", value === "all" ? "menu.html" : "#" + value);
    }
    pills.forEach(function (p) { p.addEventListener("click", function () { apply(p.getAttribute("data-filter")); }); });
    if (kind === "menu" && location.hash) {
      var wanted = location.hash.slice(1);
      if (pills.some(function (p) { return p.getAttribute("data-filter") === wanted; })) apply(wanted);
    }
  });

  /* Buscador de sucursales */
  var search = $("#branch-search");
  if (search) {
    var rows = $$("#branch-list .branch-row");
    var empty = $("#branch-empty");
    search.addEventListener("input", function () {
      var q = search.value.trim().toLowerCase();
      var visible = 0;
      rows.forEach(function (row) {
        var match = !q || row.getAttribute("data-search").indexOf(q) !== -1;
        row.hidden = !match;
        if (match) { visible++; row.classList.add("is-visible"); }
      });
      if (empty) empty.hidden = visible !== 0;
    });
  }

  /* Visor de fotos de la galería */
  var box = $("#lightbox");
  if (box) {
    var stage = $("#lightbox-stage");
    var lastFocus = null;
    var close = function () { box.hidden = true; stage.innerHTML = ""; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); };
    $$(".gallery-item").forEach(function (item) {
      item.addEventListener("click", function () {
        lastFocus = item;
        stage.innerHTML = item.firstElementChild.outerHTML;
        var inner = stage.firstElementChild;
        inner.classList.remove("gallery-item__photo");
        inner.style.width = "100%"; inner.style.height = "100%";
        box.hidden = false;
        document.body.style.overflow = "hidden";
        $(".lightbox__close", box).focus();
      });
    });
    $(".lightbox__close", box).addEventListener("click", close);
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !box.hidden) close(); });
  }
})();
