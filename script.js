// Typewriter Effect
const words = ["Student", "Aspiring Developer", "Python Enthusiast", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById("typewriter");

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
    if (typewriterElement) {
        setTimeout(typeEffect, 1000);
    }
});

// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        const icon = hamburger.querySelector("i");
        if (navLinks.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });

    // Close menu when clicking link
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            const icon = hamburger.querySelector("i");
            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    });
}

// Contact Form Handler
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Show success notification
        formStatus.style.color = "#10b981";
        formStatus.textContent = "Thank you for reaching out! Your message has been sent successfully.";
        contactForm.reset();

        setTimeout(() => {
            formStatus.textContent = "";
        }, 5000);
    });
}

// Active Nav Link Highlighting on Scroll
window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-link");

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("href") === `#${current}`) {
            item.classList.add("active");
        }
    });
});
