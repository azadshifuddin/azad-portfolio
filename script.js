```javascript
/* =========================================================
   AZAD ENGINEER PORTFOLIO
   Complete Main JavaScript
   ========================================================= */

"use strict";

/* =========================================================
   01. DOM ELEMENTS
   ========================================================= */

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("backToTop");
const currentYear = document.getElementById("currentYear");

const contactToggle = document.getElementById("contactToggle");
const floatingContact = document.getElementById("floatingContact");

const profileImage = document.querySelector(".profile-image");

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

/* =========================================================
   02. MOBILE NAVIGATION
   ========================================================= */

function closeMobileMenu() {
    if (!navMenu || !menuToggle) return;

    navMenu.classList.remove("active");
    menuToggle.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

function toggleMobileMenu() {
    if (!navMenu || !menuToggle) return;

    const isOpen = !navMenu.classList.contains("active");

    navMenu.classList.toggle("active", isOpen);
    menuToggle.classList.toggle("open", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    if (isOpen) {
        closeContactPopup();
    }
}

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleMobileMenu();
    });
}

/* Close menu after selecting a navigation link */

navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

/* Close menu when clicking outside */

document.addEventListener("click", (event) => {
    if (!navMenu || !menuToggle) return;

    if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        closeMobileMenu();
    }
});

/* Close menu when switching to desktop layout */

window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
        closeMobileMenu();
    }
});

/* =========================================================
   03. HEADER SCROLL EFFECT
   ========================================================= */

function handleHeaderScroll() {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 40);
}

/* =========================================================
   04. ACTIVE NAVIGATION
   ========================================================= */

const sections = document.querySelectorAll("main section[id]");

function updateActiveNavigation() {
    if (!navLinks.length || !sections.length) return;

    const marker = window.scrollY + window.innerHeight * 0.35;
    let currentSection = "";

    sections.forEach((section) => {
        const top =
            section.getBoundingClientRect().top + window.scrollY;

        const bottom = top + section.offsetHeight;

        if (marker >= top && marker < bottom) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isActive =
            link.getAttribute("href") === `#${currentSection}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

/* =========================================================
   05. BACK TO TOP
   ========================================================= */

function handleBackToTop() {
    if (!backToTop) return;

    backToTop.classList.toggle("show", window.scrollY > 600);
}

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion.matches ? "auto" : "smooth"
        });
    });
}

/* =========================================================
   06. SCROLL REVEAL ANIMATION
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-text, " +
    ".highlight-card, " +
    ".timeline-item, " +
    ".skill-category, " +
    ".project-card, " +
    ".education-card, " +
    ".expertise-box, " +
    ".social-container"
);

if (
    "IntersectionObserver" in window &&
    !prefersReducedMotion.matches
) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

/* =========================================================
   07. CONTACT POPUP
   ========================================================= */

function openContactPopup() {
    if (!floatingContact || !contactToggle) return;

    closeMobileMenu();

    floatingContact.classList.add("active");
    floatingContact.setAttribute("aria-hidden", "false");

    contactToggle.setAttribute("aria-expanded", "true");
}

function closeContactPopup() {
    if (!floatingContact || !contactToggle) return;

    floatingContact.classList.remove("active");
    floatingContact.setAttribute("aria-hidden", "true");

    contactToggle.setAttribute("aria-expanded", "false");
}

function toggleContactPopup() {
    if (!floatingContact) return;

    const isOpen = floatingContact.classList.contains("active");

    if (isOpen) {
        closeContactPopup();
    } else {
        openContactPopup();
    }
}

if (contactToggle && floatingContact) {
    contactToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleContactPopup();
    });

    floatingContact.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    document.addEventListener("click", (event) => {
        if (
            floatingContact.classList.contains("active") &&
            !floatingContact.contains(event.target) &&
            !contactToggle.contains(event.target)
        ) {
            closeContactPopup();
        }
    });

    /* Initial accessibility state */

    floatingContact.classList.remove("active");
    floatingContact.setAttribute("aria-hidden", "true");

    contactToggle.setAttribute("aria-expanded", "false");
}

/* =========================================================
   08. CURRENT YEAR
   ========================================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

/* =========================================================
   09. SMOOTH ANCHOR SCROLL
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.getElementById(targetId.slice(1));

        if (!target) return;

        event.preventDefault();

        closeMobileMenu();

        const headerHeight = header
            ? header.getBoundingClientRect().height
            : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: prefersReducedMotion.matches ? "auto" : "smooth"
        });

        /* Update the URL hash without triggering another jump */

        if (window.location.hash !== targetId) {
            history.replaceState(null, "", targetId);
        }
    });
});

/* =========================================================
   10. PROFILE IMAGE FALLBACK
   ========================================================= */

function handleProfileImageError() {
    if (!profileImage) return;

    profileImage.style.display = "none";

    const wrapper = profileImage.parentElement;

    if (wrapper) {
        wrapper.classList.add("image-missing");
    }
}

if (profileImage) {
    profileImage.addEventListener("error", handleProfileImageError);

    /* Handle an image that failed before this script ran */

    if (profileImage.complete && profileImage.naturalWidth === 0) {
        handleProfileImageError();
    }
}

/* =========================================================
   11. CV LINK
   ========================================================= */

/*
   Keep cv.pdf in the same folder as index.html.
   HTML link: href="cv.pdf"
*/

document.querySelectorAll('a[href="cv.pdf"]').forEach((link) => {
    link.addEventListener("click", () => {
        console.log("CV link clicked: cv.pdf");
    });
});

/* =========================================================
   12. KEYBOARD ACCESSIBILITY
   ========================================================= */

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMobileMenu();
        closeContactPopup();
    }
});

/* =========================================================
   13. SCROLL AND RESIZE HANDLING
   ========================================================= */

let scrollTicking = false;

function handleScroll() {
    if (scrollTicking) return;

    scrollTicking = true;

    window.requestAnimationFrame(() => {
        handleHeaderScroll();
        handleBackToTop();
        updateActiveNavigation();

        scrollTicking = false;
    });
}

window.addEventListener("scroll", handleScroll, {
    passive: true
});

window.addEventListener("resize", () => {
    updateActiveNavigation();
});

/* =========================================================
   14. INITIAL PAGE STATE
   ========================================================= */

function initializePortfolio() {
    document.body.classList.add("page-loaded");

    handleHeaderScroll();
    handleBackToTop();
    updateActiveNavigation();
}

if (document.readyState === "complete") {
    initializePortfolio();
} else {
    window.addEventListener("load", initializePortfolio, {
        once: true
    });
}

/* =========================================================
   15. REDUCED MOTION SUPPORT
   ========================================================= */

if (prefersReducedMotion.matches) {
    document.documentElement.style.scrollBehavior = "auto";
}
```
