/* =========================================================
   AZAD ENGINEER PORTFOLIO
   Main JavaScript
   ========================================================= */


/* =========================================================
   01. DOM ELEMENTS
   ========================================================= */

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("backToTop");
const currentYear = document.getElementById("currentYear");


/* =========================================================
   02. MOBILE MENU
   ========================================================= */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuToggle.classList.toggle("open", isOpen);

    });

}


/* =========================================================
   03. CLOSE MOBILE MENU
      When a navigation link is clicked
   ========================================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (navMenu) {
            navMenu.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        }

    });

});


/* =========================================================
   04. CLOSE MENU WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener("click", (event) => {

    if (!navMenu || !menuToggle) {
        return;
    }

    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (
        !clickedInsideMenu &&
        !clickedToggle &&
        navMenu.classList.contains("active")
    ) {

        navMenu.classList.remove("active");

        menuToggle.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});


/* =========================================================
   05. NAVBAR SCROLL EFFECT
   ========================================================= */

function handleHeaderScroll() {

    if (!header) {
        return;
    }

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    handleHeaderScroll,
    { passive: true }
);

handleHeaderScroll();


/* =========================================================
   06. ACTIVE NAVIGATION LINK
   ========================================================= */

const sections = document.querySelectorAll("section[id]");

function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY +
        window.innerHeight * 0.35;

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");

        if (target === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateActiveNavigation
);

updateActiveNavigation();


/* =========================================================
   07. BACK TO TOP BUTTON
   ========================================================= */

function handleBackToTop() {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 600) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}

window.addEventListener(
    "scroll",
    handleBackToTop,
    { passive: true }
);

handleBackToTop();


if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   08. SCROLL REVEAL ANIMATION
   ========================================================= */

/*
   Add .reveal automatically to important sections/cards.
*/

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-text, " +
    ".highlight-card, " +
    ".timeline-item, " +
    ".skill-category, " +
    ".project-card, " +
    ".education-card, " +
    ".expertise-box, " +
    ".contact-intro, " +
    ".contact-details"
);


revealElements.forEach((element) => {

    element.classList.add("reveal");

});


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
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   09. CURRENT YEAR
   ========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   10. SMOOTH ANCHOR SCROLL
   ========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((anchor) => {

    anchor.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const headerHeight =
            header
                ? header.offsetHeight
                : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* =========================================================
   11. PROFILE IMAGE FALLBACK
   ========================================================= */

/*
   If profile.jpg is missing or cannot load,
   the image will receive a subtle fallback.
*/

const profileImage =
    document.querySelector(".profile-image");

if (profileImage) {

    profileImage.addEventListener(
        "error",
        () => {

            profileImage.style.display = "none";

            const wrapper =
                profileImage.parentElement;

            if (wrapper) {

                wrapper.classList.add(
                    "image-missing"
                );

            }

        }
    );

}


/* =========================================================
   12. CV DOWNLOAD CHECK
   ========================================================= */

const cvLinks =
    document.querySelectorAll(
        'a[href="assets/cv.pdf"]'
    );

cvLinks.forEach((link) => {

    link.addEventListener("click", () => {

        console.log(
            "CV download requested."
        );

    });

});


/* =========================================================
   13. KEYBOARD ACCESSIBILITY
   ========================================================= */

document.addEventListener("keydown", (event) => {

    /*
       ESC closes mobile navigation
    */

    if (event.key === "Escape") {

        if (
            navMenu &&
            navMenu.classList.contains("active")
        ) {

            navMenu.classList.remove("active");

        }

        if (menuToggle) {

            menuToggle.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }

});


/* =========================================================
   14. PAGE LOAD
   ========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

    handleHeaderScroll();
    handleBackToTop();
    updateActiveNavigation();

});

/* =========================================================
   15. REDUCED MOTION SUPPORT
   ========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

if (prefersReducedMotion.matches) {

    document.documentElement.style.scrollBehavior =
        "auto";

}

/* =========================
   FLOATING CONTACT POPUP
========================= */
(function () {
    const toggleBtn = document.getElementById('contactToggle');
    const popup = document.getElementById('floatingContact');
    if (!toggleBtn || !popup) return;

    // popup-এর design JS নিজেই যোগ করবে
    const style = document.createElement('style');
    style.textContent = `
    #floatingContact {
        position: fixed;
        top: 0;
        left: 0;
        right: auto;
        bottom: auto;
        z-index: 10000;
        width: 290px;
        max-width: calc(100vw - 20px);
        max-height: 60vh;
        overflow-y: auto;
        background: #0d1523;
        color: #f4f7fc;
        border: 1px solid rgba(56, 217, 255, 0.38);
        border-radius: 16px;
        box-shadow: 0 14px 40px rgba(0, 0, 0, 0.6);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateY(10px);
        transition: opacity .25s ease, transform .25s ease, visibility .25s ease;
    }
    #floatingContact.show {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateY(0);
    }
    #floatingContact .contact-popup-header {
        padding: 12px 16px 10px;
        text-align: center;
        background: #080d17;
        border-bottom: 1px solid rgba(56, 217, 255, 0.2);
    }
    #floatingContact .contact-handle {
        display: block;
        width: 42px;
        height: 4px;
        margin: 0 auto 8px;
        border-radius: 10px;
        background: #38d9ff;
    }
    #floatingContact .contact-popup-header h2 {
        margin: 0;
        font-size: 20px;
        font-weight: 700;
        color: #f4f7fc;
    }
    #floatingContact .contact-popup-body {
        padding: 6px 16px 12px;
    }
    #floatingContact .contact-item {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 10px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        color: inherit;
        text-decoration: none;
        overflow-wrap: anywhere;
    }
    #floatingContact .contact-item:last-child {
        border-bottom: none;
    }
    #floatingContact .contact-label {
        color: #38d9ff;
        font-size: 16px;
        font-weight: 700;
    }
    #floatingContact .contact-value {
        color: #b7c2d0;
        font-size: 13px;
        line-height: 1.5;
    }
    #floatingContact .contact-item:hover .contact-value {
        color: #38d9ff;
    }`;
    document.head.appendChild(style);

    let isOpen = false;

    function placePopup() {
        const r = toggleBtn.getBoundingClientRect();
        const pw = popup.offsetWidth;
        const ph = popup.offsetHeight;
        const gap = 12;

        let left = r.left + r.width / 2 - pw / 2;
        left = Math.max(10, Math.min(left, window.innerWidth - pw - 10));

        let top = r.top - ph - gap;
        if (top < 10) top = r.bottom + gap;

        popup.style.left = left + 'px';
        popup.style.top = top + 'px';
    }

    function openPopup() {
        isOpen = true;
        popup.classList.add('show');
        placePopup();
        popup.setAttribute('aria-hidden', 'false');
        toggleBtn.setAttribute('aria-expanded', 'true');
    }

    function closePopup() {
        isOpen = false;
        popup.classList.remove('show');
        popup.setAttribute('aria-hidden', 'true');
        toggleBtn.setAttribute('aria-expanded', 'false');
    }

    toggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        isOpen ? closePopup() : openPopup();
    });

    document.addEventListener('click', function (e) {
        if (isOpen && !popup.contains(e.target)) closePopup();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen) closePopup();
    });

    window.addEventListener('resize', function () {
        if (isOpen) placePopup();
    });

    window.addEventListener('scroll', function () {
        if (isOpen) placePopup();
    }, { passive: true });
})();

