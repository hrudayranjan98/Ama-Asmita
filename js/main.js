/* ==========================================
   LOAD COMPONENTS
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    async () =>
{
    try
    {
        /* ======================
           NAVBAR
        ====================== */
        const navbarContainer =
document.getElementById(
    "navbar-container"
);

if(navbarContainer)
{
    const response =
    await fetch(
        "components/navbar.html"
    );

    navbarContainer.innerHTML =
    await response.text();

    const script =
    document.createElement(
        "script"
    );

    script.src =
    "js/navbar.js?v=" +
    new Date().getTime();

    document.body.appendChild(
        script
    );
}
        /* ======================
           FOOTER
        ====================== */

        const footerContainer =
            document.getElementById(
                "footer-container"
            );

        if(footerContainer)
        {
            const footerResponse =
                await fetch(
                    "components/footer.html"
                );

            footerContainer.innerHTML =
                await footerResponse.text();
        }

    }
    catch(error)
    {
        console.error(
            "Component Load Error:",
            error
        );
    }
});

/* ==========================================
AOS INITIALIZATION
========================================== */

AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

/* ==========================================
SWIPER INITIALIZATION
========================================== */

const featuredSwiper = new Swiper('.featuredSwiper', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    spaceBetween: 30,
    slidesPerView: 1,
    breakpoints: {
        576: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        992: {
            slidesPerView: 3
        }
    }
});

/* ==========================================
GSAP HERO ANIMATION
========================================== */

window.addEventListener('load', () => {
    const tl = gsap.timeline();

    tl.from('.navbar', {
        y: -80,
        opacity: 0,
        duration: 1
    })
    .from('.hero-tag', {
        x: -100,
        opacity: 0,
        duration: 0.8
    })
    .from('.hero-title', {
        y: 80,
        opacity: 0,
        duration: 1
    })
    .from('.hero-description', {
        y: 50,
        opacity: 0,
        duration: 0.8
    })
    .from('.hero-buttons', {
        y: 50,
        opacity: 0,
        duration: 0.8
    })
    .from('lottie-player', {
        scale: 0.7,
        opacity: 0,
        duration: 1
    });
});

/* ==========================================
NAVBAR SCROLL EFFECT
========================================== */

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.custom-navbar');

    if(window.scrollY > 50){
        navbar.style.background = "rgba(0,0,0,0.75)";
        navbar.style.backdropFilter = "blur(20px)";
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.25)";
    }
    else{
        navbar.style.background = "rgba(0,0,0,0.25)";
        navbar.style.boxShadow = "none";
    }
});

/* ==========================================
STATISTICS COUNTER
========================================== */

const counters = document.querySelectorAll('.stat-card h2');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const counter = entry.target;
            const target = parseInt(counter.innerText.replace('+',''));
            let count = 0;
            const speed = target / 100;

            const updateCounter = () => {
                count += speed;

                if(count < target){
                    counter.innerText = Math.floor(count) + '+';
                    requestAnimationFrame(updateCounter);
                }
                else{
                    counter.innerText = target + '+';
                }
            }

            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
},{
    threshold:0.5
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});

/* ==========================================
FEATURE CARD HOVER EFFECT
========================================== */

const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.03,
            duration: 0.3
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3
        });
    });
});

/* ==========================================
DESTINATION CARD ANIMATION
========================================== */

const destinationCards = document.querySelectorAll('.destination-card');

destinationCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -10,
            duration: 0.3
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            duration: 0.3
        });
    });
});

/* ==========================================
PARALLAX EFFECT
========================================== */

window.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;

    gsap.to('.map-image', {
        x: x,
        y: y,
        duration: 1.5,
        ease: "power2.out"
    });
});

/* ==========================================
TEXT REVEAL EFFECT
========================================== */

gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: title,
        y: 50,
        opacity: 0,
        duration: 1
    });
});

/* ==========================================
SCROLL TO TOP BUTTON (OPTIONAL)
========================================== */

const scrollBtn = document.createElement('button');

scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollBtn.classList.add('scroll-top');
document.body.appendChild(scrollBtn);

scrollBtn.style.cssText = `position:fixed;
bottom:30px;
right:30px;
width:50px;
height:50px;
border:none;
border-radius:50%;
background:#ff6b35;
color:#fff;
font-size:18px;
cursor:pointer;
display:none;
z-index:999;
box-shadow:0 10px 20px rgba(0,0,0,.3);`;

window.addEventListener('scroll', () => {
    if(window.scrollY > 300){
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ==========================================
PAGE LOADER
========================================== */

window.addEventListener('load', () =>
{
    const loader =
    document.getElementById('page-loader');

    setTimeout(() =>
    {
        loader.classList.add('hide');
    }, 150);
});


// Download Feature

if ("serviceWorker" in navigator)
{
    window.addEventListener(
        "load",
        () =>
        {
            navigator.serviceWorker
            .register("./sw.js")

            .then(() =>
            {
                console.log(
                    "Service Worker Registered"
                );
            })

            .catch(error =>
            {
                console.error(error);
            });
        }
    );
}

// Download Button

let deferredPrompt;

window.addEventListener(
    "beforeinstallprompt",
    (e) =>
    {

        e.preventDefault();

        deferredPrompt = e;

        document
        .getElementById("installBtn")
        .style.display = "block";

    }
);

document
.getElementById("installBtn")
.addEventListener(
    "click",
    async () =>
    {

        deferredPrompt.prompt();

        await deferredPrompt.userChoice;

        deferredPrompt = null;

    }
);

// Visitors Counter

window.addEventListener("load", function () {

    const timer = setInterval(function () {

        if (window.goatcounter && window.goatcounter.visit_count) {

            clearInterval(timer);

            window.goatcounter.visit_count({
                append: "#visitor-counter",
                type: "html",
                no_branding: true
            });

        }

    }, 100);

});

// Navbar

const script =
document.createElement("script");

script.src =
"/js/profile.js";

document.body.appendChild(
script
);