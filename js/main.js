const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileClose");

function openMenu() {
    if (!menuToggle || !mobileMenu) {
        return;
    }

    mobileMenu.classList.add("open");
    document.body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
}

function closeMenu() {
    if (!menuToggle || !mobileMenu) {
        return;
    }

    mobileMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
}

if (menuToggle && mobileMenu && mobileClose) {
    menuToggle.addEventListener("click", openMenu);
    mobileClose.addEventListener("click", closeMenu);

    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    mobileMenu.addEventListener("click", (event) => {
        if (event.target === mobileMenu) {
            closeMenu();
        }
    });
}

const faqItems = document.querySelectorAll(".faq-item");

function closeFaqItem(item) {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!button || !answer) {
        return;
    }

    item.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
    answer.style.maxHeight = "0px";
}

function openFaqItem(item) {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!button || !answer) {
        return;
    }

    item.classList.add("is-open");
    button.setAttribute("aria-expanded", "true");
    answer.style.maxHeight = `${answer.scrollHeight}px`;
}

faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");

    if (!button) {
        return;
    }

    closeFaqItem(item);

    button.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");

        faqItems.forEach((otherItem) => closeFaqItem(otherItem));

        if (!isOpen) {
            openFaqItem(item);
        }
    });
});

window.addEventListener("resize", () => {
    faqItems.forEach((item) => {
        if (item.classList.contains("is-open")) {
            const answer = item.querySelector(".faq-answer");
            if (answer) {
                answer.style.maxHeight = `${answer.scrollHeight}px`;
            }
        }
    });
});

const form = document.querySelector(".contact-form");
const modal = document.getElementById("successModal");
const modalBtn = document.getElementById("modalOk");

if (form && modal && modalBtn) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                modal.classList.add("active");
                modal.setAttribute("aria-hidden", "false");
            } else {
                alert("Error sending message");
            }
        } catch (error) {
            alert("Network error");
        }
    });

    modalBtn.addEventListener("click", () => {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        form.reset();
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("active");
            modal.setAttribute("aria-hidden", "true");
        }
    });
}
