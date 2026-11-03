/* ==========================================================================
   VELNORA STUDIO — interface behaviour
   Vanilla JavaScript, no dependencies, works from a static host.
   ========================================================================== */

(function () {
  "use strict";

  var config = window.VELNORA || {};
  var brand = config.brand || {};
  var contact = config.contact || {};
  var social = config.social || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------------------
     Central configuration hydration
     ---------------------------------------------------------------------- */

  function setText(selector, value) {
    if (!value) return;
    document.querySelectorAll(selector).forEach(function (element) {
      element.textContent = value;
    });
  }

  setText('[data-brand="name"]', brand.name);
  setText('[data-brand="short"]', brand.name);
  setText('[data-brand="suffix"]', brand.suffix);
  setText('[data-brand="full"]', brand.full);
  setText('[data-brand="tagline"]', brand.tagline);
  setText('[data-brand="tagline-en"]', brand.taglineEn);
  setText("[data-location]", contact.location);
  setText("[data-availability]", contact.availability);

  var email = String(contact.email || "").trim();
  if (email) {
    document.querySelectorAll("[data-email]").forEach(function (element) {
      element.textContent = email;
      if (element.tagName === "A") {
        element.href = "mailto:" + email;
      }
    });
  }

  var whatsappNumber = String(contact.whatsapp || "").replace(/\D/g, "");
  var whatsappMessage = contact.whatsappMessage || "Bonjour, je souhaite parler d'un projet.";
  var whatsappUrl = whatsappNumber
    ? "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(whatsappMessage)
    : "https://wa.me/?text=" + encodeURIComponent(whatsappMessage);

  document.querySelectorAll("[data-whatsapp]").forEach(function (element) {
    element.href = whatsappUrl;
    element.target = "_blank";
    element.rel = "noopener noreferrer";
  });

  document.querySelectorAll("[data-year]").forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });

  if (contact.formEndpoint) {
    document.querySelectorAll("[data-demo-note]").forEach(function (element) {
      element.hidden = true;
    });
  }

  Object.keys(social).forEach(function (network) {
    var url = social[network];
    var link = document.querySelector('[data-social-link="' + network + '"]');
    var placeholder = document.querySelector('[data-social-placeholder="' + network + '"]');

    if (url) {
      if (link) {
        link.href = url;
        link.hidden = false;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      if (placeholder) placeholder.hidden = true;
    } else {
      if (link) link.hidden = true;
      if (placeholder) placeholder.hidden = false;
    }
  });

  /* ----------------------------------------------------------------------
     Header state and scroll progress
     ---------------------------------------------------------------------- */

  var header = document.querySelector("[data-header]");
  var progressBar = document.querySelector("[data-scroll-progress]");
  var scrollTicking = false;

  function updateScrollUI() {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    }

    if (progressBar) {
      var documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = documentHeight > 0 ? Math.min(window.scrollY / documentHeight, 1) : 0;
      progressBar.style.transform = "scaleX(" + progress.toFixed(4) + ")";
    }

    scrollTicking = false;
  }

  function requestScrollUI() {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(updateScrollUI);
  }

  window.addEventListener("scroll", requestScrollUI, { passive: true });
  window.addEventListener("resize", requestScrollUI, { passive: true });
  updateScrollUI();

  /* ----------------------------------------------------------------------
     Mobile navigation
     ---------------------------------------------------------------------- */

  var menuToggle = document.querySelector("[data-menu-toggle]");
  var mobileMenu = document.querySelector("[data-mobile-menu]");
  var main = document.querySelector("main");
  var footer = document.querySelector(".site-footer");
  var menuOpen = false;
  var lastFocused = null;
  var closeTimer = null;

  function focusableInMenu() {
    if (!mobileMenu) return [];
    return Array.prototype.slice
      .call(
        mobileMenu.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      )
      .filter(function (element) {
        return element.offsetParent !== null;
      });
  }

  function openMenu() {
    if (!mobileMenu || !menuToggle || menuOpen) return;
    menuOpen = true;
    lastFocused = document.activeElement;
    window.clearTimeout(closeTimer);
    mobileMenu.hidden = false;
    document.body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
    if (main) main.inert = true;
    if (footer) footer.inert = true;

    window.requestAnimationFrame(function () {
      mobileMenu.classList.add("is-open");
      var focusable = focusableInMenu();
      if (focusable.length) focusable[0].focus();
    });
  }

  function closeMenu(restoreFocus) {
    if (!mobileMenu || !menuToggle || !menuOpen) return;
    menuOpen = false;
    mobileMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    if (main) main.inert = false;
    if (footer) footer.inert = false;

    closeTimer = window.setTimeout(
      function () {
        mobileMenu.hidden = true;
        if (restoreFocus) {
          var canRestore =
            lastFocused &&
            lastFocused !== document.body &&
            lastFocused !== document.documentElement &&
            document.contains(lastFocused);
          var target = canRestore ? lastFocused : menuToggle;
          if (target && typeof target.focus === "function") target.focus();
        }
      },
      reduceMotion ? 0 : 430
    );
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      if (menuOpen) {
        closeMenu(true);
      } else {
        openMenu();
      }
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (!menuOpen) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key !== "Tab") return;
      var focusable = focusableInMenu();
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    var desktopQuery = window.matchMedia("(max-width: 1020px)");
    var handleBreakpoint = function (event) {
      if (!event.matches && menuOpen) closeMenu(false);
    };

    if (typeof desktopQuery.addEventListener === "function") {
      desktopQuery.addEventListener("change", handleBreakpoint);
    } else if (typeof desktopQuery.addListener === "function") {
      desktopQuery.addListener(handleBreakpoint);
    }
  }

  /* ----------------------------------------------------------------------
     Reveal on scroll
     ---------------------------------------------------------------------- */

  var revealItems = document.querySelectorAll("[data-reveal]");

  if (revealItems.length && !reduceMotion && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );

    revealItems.forEach(function (item) {
      item.classList.add("reveal-ready");
      if (item.dataset.revealOrder) {
        item.style.setProperty("--reveal-order", item.dataset.revealOrder);
      }
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  /* ----------------------------------------------------------------------
     Pricing → contact form preselection
     ---------------------------------------------------------------------- */

  var packageMap = {
    starter: { type: "Site web", budget: "700 – 1 500 MAD" },
    business: { type: "Site web", budget: "1 500 – 2 500 MAD" },
    custom: { type: "Application web", budget: "2 500 – 5 000 MAD" }
  };

  function applyPackage(key) {
    var selected = packageMap[key];
    if (!selected) return;

    var form = document.querySelector("[data-contact-form]");
    if (!form) return;

    var projectType = form.querySelector('[name="projectType"]');
    var budget = form.querySelector('[name="budget"]');

    if (projectType) projectType.value = selected.type;
    if (budget) budget.value = selected.budget;
  }

  document.querySelectorAll("[data-package]").forEach(function (button) {
    button.addEventListener("click", function () {
      applyPackage(button.dataset.package);
    });
  });

  var initialOffer = new URLSearchParams(window.location.search).get("offre");
  if (initialOffer) applyPackage(initialOffer);

  /* ----------------------------------------------------------------------
     Graceful anchor scrolling with the fixed header
     ---------------------------------------------------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var id = link.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      if (history.pushState) history.pushState(null, "", id);
    });
  });
})();
