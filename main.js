const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
}, { passive: true });

const revealObserver = new IntersectionObserver((elements) => {
    elements.forEach((el) => {
        if (el.isIntersecting) {
            el.target.classList.add("visible");
            revealObserver.unobserve(el.target);
        }
    });
}, { threshold: 0.35 });

document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
});

// Фильтрация карточек меню
const filterBtn = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

filterBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtn.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;
        menuCards.forEach(card => {
            const cardFilter = filter === 'all' || card.dataset.category === filter;
            if (cardFilter) {
                card.classList.remove("hidden");
                requestAnimationFrame(() => card.style.opacity = "1");
            } else {
                card.style.opacity = "0";
                setTimeout(() => {
                    card.classList.add("hidden");
                }, 300);
            }
        });
    });
});

// Модальное окно
const overlay = document.querySelector("#menuModal");
const modalClose = document.querySelector("#modalClose");
const openBtn = document.querySelector(".btn-primary");
const bookBtn = document.querySelector("#modalBookBtn");

function openModal() {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
}

if (openBtn) {
    openBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
    });
}

if (modalClose) {
    modalClose.addEventListener("click", closeModal);
}

if (overlay) {
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
});


const scrollToTopBtn = document.querySelector(".scroll-to-top");


function toggleScrollToTopBtn() {
    
    const secondSection = document.querySelector("#menu");
    
    if (secondSection) {
        const secondSectionTop = secondSection.offsetTop;
        
        
        if (window.scrollY >= secondSectionTop - 100) {
            scrollToTopBtn.classList.add("visible");
        } else {
            scrollToTopBtn.classList.remove("visible");
        }
    } else {
        
        if (window.scrollY > 600) {
            scrollToTopBtn.classList.add("visible");
        } else {
            scrollToTopBtn.classList.remove("visible");
        }
    }
}


function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToTop();
    });
}


window.addEventListener("scroll", toggleScrollToTopBtn);


toggleScrollToTopBtn();