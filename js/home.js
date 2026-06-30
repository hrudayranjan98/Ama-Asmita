document.addEventListener('DOMContentLoaded', () => 
{


/* ==========================================
   FETCH COUNTS FROM JSON
========================================== */

async function loadCounts() {

    try {

        const touristData =
            await fetch("data/tourist-spots.json")
            .then(res => res.json());

        const foodData =
            await fetch("data/foods.json")
            .then(res => res.json());

        const historyData =
            await fetch("data/history.json")
            .then(res => res.json());

        document.getElementById("touristCount")
            .innerText = touristData.length + "+";

        document.getElementById("foodCount")
            .innerText = foodData.length + "+";

        document.getElementById("historyCount")
            .innerText = historyData.length + "+";

    }

    catch(error) {

        console.error(
            "Error loading counts:",
            error
        );
    }

}

loadCounts();

/* ==========================================
   STAT COUNTER
========================================== */

const counters = document.querySelectorAll('.stat-card h2');

const observer = new IntersectionObserver((entries) => 
{
    entries.forEach(entry => 
    {
        if (!entry.isIntersecting) return;
        const counter = entry.target;
        const target = parseInt
        (
            counter.innerText.replace('+', '')
        );

        let count = 0;
        const increment = target / 100;

        function updateCounter() 
        {
            count += increment;

            if (count < target) 
            {
                counter.innerText =
                    Math.floor(count) + '+';
                requestAnimationFrame(updateCounter);

            } 
            
            else 
            {

                counter.innerText =
                    target + '+';
            }
        }

        updateCounter();

        observer.unobserve(counter);

    });

}, {
    threshold: 0.5
});

counters.forEach(counter => {
    observer.observe(counter);
});
 

});

/* ==========================================
SWIPER
========================================== */

new Swiper('.featuredSwiper', {

 
loop: true,

autoplay: {
    delay: 3000,
    disableOnInteraction: false
},

spaceBetween: 30,

slidesPerView: 1,

breakpoints: {

    768: {
        slidesPerView: 2
    },

    992: {
        slidesPerView: 3
    }
}
 

});

/* ==========================================
HERO ANIMATION
========================================== */

window.addEventListener('load', () => {

 
const tl = gsap.timeline();

tl.from('.navbar', {
    y: -100,
    opacity: 0,
    duration: 1
})

.from('.hero-tag', {
    y: 50,
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
});
 

});

/* ==========================================
FEATURE CARD HOVER
========================================== */

document
.querySelectorAll('.feature-card')
.forEach(card => {

 
card.addEventListener('mouseenter', () => {

    gsap.to(card, {
        y: -8,
        duration: .3
    });

});

card.addEventListener('mouseleave', () => {

    gsap.to(card, {
        y: 0,
        duration: .3
    });

});
 

});

/* ==========================================
PARALLAX MAP
========================================== */

const map = document.querySelector('.map-image');

if (map) {

    window.addEventListener('mousemove', (e) => {

        const x =
            (window.innerWidth / 2 - e.pageX) / 50;

        const y =
            (window.innerHeight / 2 - e.pageY) / 50;

        gsap.to(map, {
            x: x,
            y: y,
            duration: 1.5,
            ease: "power2.out"
        });

    });