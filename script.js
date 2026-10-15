/* =========================================================
   AZAD SHIFUDDIN PORTFOLIO
   Main JavaScript — responsive navigation and interactions
   ========================================================= */
(() => {
    "use strict";

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

    const header = $("#header");
    const menuToggle = $("#menuToggle");
    const navMenu = $("#navMenu");
    const navLinks = $$(".nav-link");
    const backToTop = $("#backToTop");
    const currentYear = $("#currentYear");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Mark JS as initialized; CSS uses this class to enable reveal animations safely.
    document.documentElement.classList.add("js-enabled");

    // Footer year.
    if (currentYear) {
        currentYear.textContent = String(new Date().getFullYear());
    }

    // Mobile navigation.
    const setMenuOpen = (open) => {
        if (!menuToggle || !navMenu) return;
        navMenu.classList.toggle("active", open);
        menuToggle.classList.toggle("open", open);
        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
        document.body.classList.toggle("menu-open", open);
    };

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();
            setMenuOpen(!navMenu.classList.contains("active"));
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => setMenuOpen(false));
        });

        document.addEventListener("click", (event) => {
            if (!navMenu.classList.contains("active")) return;
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                setMenuOpen(false);
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") setMenuOpen(false);
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) setMenuOpen(false);
        });
    }

    // Header style and back-to-top visibility.
    const updateScrollUI = () => {
        const y = window.scrollY || document.documentElement.scrollTop || 0;
        if (header) header.classList.toggle("scrolled", y > 20);
        if (backToTop) {
            backToTop.classList.toggle("show", y > 450);
            backToTop.setAttribute("aria-hidden", String(y <= 450));
        }
    };

    window.addEventListener("scroll", updateScrollUI, { passive: true });
    updateScrollUI();

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
        });
    }

    // Active navigation link based on visible section.
    const sections = $$("main section[id]");
    if ("IntersectionObserver" in window && sections.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const activeId = entry.target.id;
                navLinks.forEach((link) => {
                    const active = link.getAttribute("href") === `#${activeId}`;
                    link.classList.toggle("active", active);
                    if (active) link.setAttribute("aria-current", "location");
                    else link.removeAttribute("aria-current");
                });
            });
        }, {
            rootMargin: "-35% 0px -55% 0px",
            threshold: 0
        });

        sections.forEach((section) => sectionObserver.observe(section));
    }

    // Scroll reveal. If IntersectionObserver is unsupported, show content immediately.
    const revealTargets = $$(
        ".section-heading, .hero-content, .hero-visual, .highlight-card, " +
        ".timeline-item, .skill-category, .project-card, .education-card, " +
        ".expertise-box, .social-container"
    );

    revealTargets.forEach((element) => element.classList.add("reveal"));

    if ("IntersectionObserver" in window && !reducedMotion) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.08,
            rootMargin: "0px 0px -35px 0px"
        });

        revealTargets.forEach((element) => revealObserver.observe(element));
    } else {
        revealTargets.forEach((element) => element.classList.add("visible"));
    }

    // Smooth in-page navigation fallback for browsers that ignore CSS scroll behavior.
    $$('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (!href || href === "#") return;
            const target = $(href);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth",
                block: "start"
            });
            if (window.history && window.history.replaceState) {
                window.history.replaceState(null, "", href);
            }
        });
    });

    // Keep a broken profile image from showing a broken-image icon.
    const profileImage = $(".profile-image");
    if (profileImage) {
        profileImage.addEventListener("error", () => {
            profileImage.style.display = "none";
            const wrapper = profileImage.closest(".profile-image-wrapper");
            if (wrapper) {
                wrapper.setAttribute("role", "img");
                wrapper.setAttribute("aria-label", "Profile image unavailable");
            }
        }, { once: true });
    }

    // CV link is a regular local download; avoid intercepting it with JavaScript.

    // Contact popup. Kept in this IIFE to avoid duplicate event handlers.
    const contactToggle = $("#contactToggle");
    const floatingContact = $("#floatingContact");
    const contactClose = $("#contactClose");

    const closeContactPopup = () => {
        if (!contactToggle || !floatingContact) return;
        floatingContact.classList.remove("active");
        floatingContact.setAttribute("aria-hidden", "true");
        contactToggle.setAttribute("aria-expanded", "false");
    };

    if (contactToggle && floatingContact) {
        contactToggle.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            const shouldOpen = !floatingContact.classList.contains("active");
            if (shouldOpen) {
                setMenuOpen(false);
                floatingContact.classList.add("active");
                floatingContact.setAttribute("aria-hidden", "false");
                contactToggle.setAttribute("aria-expanded", "true");
            } else {
                closeContactPopup();
            }
        });

        floatingContact.addEventListener("click", (event) => event.stopPropagation());
        document.addEventListener("click", (event) => {
            if (floatingContact.classList.contains("active") &&
                !floatingContact.contains(event.target) &&
                !contactToggle.contains(event.target)) {
                closeContactPopup();
            }
        });
        if (contactClose) contactClose.addEventListener("click", closeContactPopup);
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeContactPopup();
        });
        closeContactPopup();
    }
})();
