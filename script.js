// Typewriter Effect
const words = [
    "Python & Java Developer",
    "SQL & Database Programmer",
    "C & Software Engineer",
    "Web Developer (HTML/CSS)",
    "Logic & Algorithm Solver"
];
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

    let typeSpeed = isDeleting ? 40 : 90;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1800; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400; // Pause before typing next word
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

// Contact Form Handler (FormSubmit.co Integration)
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        const name = nameInput ? nameInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";
        const message = messageInput ? messageInput.value.trim() : "";

        if (!name || !email || !message) {
            formStatus.style.color = "#ef4444";
            formStatus.textContent = "Please fill in all required fields.";
            return;
        }

        // Show sending status
        formStatus.style.color = "#3b82f6";
        formStatus.textContent = "Sending your message...";
        if (submitBtn) submitBtn.disabled = true;

        try {
            const response = await fetch("https://formsubmit.co/ajax/mariamfathima130607@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                    _subject: `New Portfolio Message from ${name}`,
                    _template: "table"
                })
            });

            const result = await response.json();

            if (response.ok && (result.success === "true" || result.success === true)) {
                formStatus.style.color = "#10b981";
                formStatus.textContent = "Thank you! Your message has been sent successfully to Mariam's inbox.";
                contactForm.reset();
            } else {
                throw new Error(result.message || "Failed to send message");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            formStatus.style.color = "#ef4444";
            formStatus.textContent = "Unable to send message automatically. Redirecting to direct mail submit...";
            // Fallback: standard submit if AJAX fetch fails or is blocked
            setTimeout(() => {
                contactForm.submit();
            }, 1500);
        } finally {
            if (submitBtn) submitBtn.disabled = false;
            setTimeout(() => {
                formStatus.textContent = "";
            }, 7000);
        }
    });
}

// Active Nav Link Highlighting on Scroll
window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-link");

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
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
