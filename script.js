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