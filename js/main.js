/* =============================================================
   DroneTV Redesign — main.js
   Modules: nav, scroll header, reveal, counters, filters,
            forms, password toggle, dashboard tabs, toast
   ============================================================= */
(function () {
  "use strict";

  /* ---------- Toast ---------- */
  function toast(message) {
    var el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      document.body.appendChild(el);
    }
    el.textContent = message;
    requestAnimationFrame(function () { el.classList.add("is-visible"); });
    clearTimeout(el._timer);
    el._timer = setTimeout(function () { el.classList.remove("is-visible"); }, 3200);
  }

  /* ---------- Mobile navigation ---------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) close();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) close();
    });
  }

  /* ---------- Sticky header state ---------- */
  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Animated counters ---------- */
  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    var suffix = el.dataset.suffix || "";
    var duration = 1400;
    var start = performance.now();
    function frame(now) {
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var value = target * eased;
      el.textContent = (target % 1 ? value.toFixed(1) : Math.round(value).toLocaleString()) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function initCounters() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;
    if (!("IntersectionObserver" in window)) { nums.forEach(countUp); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { countUp(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    nums.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Card filtering (services / courses) ---------- */
  function initFilters() {
    var groups = document.querySelectorAll("[data-filter-group]");
    groups.forEach(function (group) {
      var targetSel = group.dataset.filterTarget;
      var items = document.querySelectorAll(targetSel + " [data-category]");
      var empty = document.querySelector(targetSel + "-empty");

      group.addEventListener("click", function (e) {
        var btn = e.target.closest(".pill");
        if (!btn) return;
        group.querySelectorAll(".pill").forEach(function (p) { p.setAttribute("aria-pressed", "false"); });
        btn.setAttribute("aria-pressed", "true");

        var value = btn.dataset.filter;
        var shown = 0;
        items.forEach(function (item) {
          var match = value === "all" || item.dataset.category === value;
          item.hidden = !match;
          if (match) shown++;
        });
        if (empty) empty.hidden = shown !== 0;
      });
    });
  }

  /* ---------- Password visibility ---------- */
  function initPasswordToggle() {
    document.querySelectorAll(".password-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var input = document.getElementById(btn.dataset.target);
        if (!input) return;
        var show = input.type === "password";
        input.type = show ? "text" : "password";
        btn.textContent = show ? "Hide" : "Show";
        btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
      });
    });
  }

  /* ---------- Form validation ---------- */
  function setError(input, message) {
    var box = document.getElementById(input.id + "-error");
    if (box) box.textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
    return !message;
  }

  function initLoginForm() {
    var form = document.getElementById("login-form");
    if (!form) return;
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    var validEmail = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); };

    [email, password].forEach(function (input) {
      input.addEventListener("input", function () { setError(input, ""); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      ok = setError(email, validEmail(email.value) ? "" : "Enter a valid email address.") && ok;
      ok = setError(password, password.value.length >= 6 ? "" : "Password must be at least 6 characters.") && ok;
      if (!ok) { (email.getAttribute("aria-invalid") === "true" ? email : password).focus(); return; }

      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = "Signing in…";
      toast("Signed in — taking you to your dashboard.");
      setTimeout(function () { window.location.href = "dashboard.html"; }, 1100);
    });
  }

  /* ---------- Newsletter + generic demo forms ---------- */
  function initDemoForms() {
    document.querySelectorAll("[data-demo-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        toast(form.dataset.demoForm || "Thanks — we'll be in touch.");
        form.reset();
      });
    });
  }

  /* ---------- Dashboard tabs + progress ---------- */
  function initDashboard() {
    var nav = document.querySelector(".dash-nav");
    if (!nav) return;
    var links = nav.querySelectorAll("a[data-panel]");
    var panels = document.querySelectorAll(".dash__panel");

    function activate(id) {
      links.forEach(function (l) {
        var on = l.dataset.panel === id;
        l.classList.toggle("is-active", on);
        l.setAttribute("aria-current", on ? "page" : "false");
      });
      panels.forEach(function (p) { p.hidden = p.id !== "panel-" + id; });
      var title = document.getElementById("dash-title");
      var active = nav.querySelector('a[data-panel="' + id + '"]');
      if (title && active) title.textContent = active.dataset.title || active.textContent.trim();
    }

    nav.addEventListener("click", function (e) {
      var link = e.target.closest("a[data-panel]");
      if (!link) return;
      e.preventDefault();
      activate(link.dataset.panel);
    });

    // Animate progress bars once visible
    setTimeout(function () {
      document.querySelectorAll(".progress__bar").forEach(function (bar) {
        bar.style.width = (bar.dataset.value || 0) + "%";
      });
    }, 250);

    document.querySelectorAll("#logout, #logout-mobile").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        toast("Signed out. See you soon!");
        setTimeout(function () { window.location.href = "index.html"; }, 900);
      });
    });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initHeaderScroll();
    initReveal();
    initCounters();
    initFilters();
    initPasswordToggle();
    initLoginForm();
    initDemoForms();
    initDashboard();
    initYear();
  });
})();
