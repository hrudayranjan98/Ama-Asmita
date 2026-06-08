/* ==========================================
   FOOD.JS
   Ama Asmita
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const categoryFilter =
        document.getElementById("foodCategory");

    const areaFilter =
        document.getElementById("foodArea");

    const searchInput =
        document.getElementById("foodSearch");

    const foodCards =
        document.querySelectorAll(".food-card-item");

    const foodContainer =
        document.getElementById("foodContainer");

    let noResultMessage = null;

    /* ==========================
       FILTER FUNCTION
    ========================== */

    function filterFoods() {

        const selectedCategory =
            categoryFilter.value.toLowerCase();

        const selectedArea =
            areaFilter.value.toLowerCase();

        const searchText =
            searchInput.value.toLowerCase();

        let visibleCards = 0;

        foodCards.forEach(card => {

            const category =
                card.dataset.category.toLowerCase();

            const area =
                card.dataset.area.toLowerCase();

            const title =
                card.querySelector("h2")
                    .innerText
                    .toLowerCase();

            const categoryMatch =
                selectedCategory === "all" ||
                category === selectedCategory;

            const areaMatch =
                selectedArea === "" ||
                area === selectedArea;

            const searchMatch =
                title.includes(searchText);

            if (
                categoryMatch &&
                areaMatch &&
                searchMatch
            ) {

                card.style.display = "block";
                visibleCards++;

            } else {

                card.style.display = "none";
            }

        });

        showNoResults(visibleCards);

    }

    /* ==========================
       NO RESULTS
    ========================== */

    function showNoResults(count) {

        if (count === 0) {

            if (!noResultMessage) {

                noResultMessage =
                    document.createElement("div");

                noResultMessage.classList.add(
                    "no-results"
                );

                noResultMessage.innerHTML = `
                    <i class="fas fa-utensils fa-3x mb-3"></i>
                    <h3>No Food Found</h3>
                    <p>
                        Try changing category,
                        area or search keyword.
                    </p>
                `;

                foodContainer.appendChild(
                    noResultMessage
                );
            }

        } else {

            if (noResultMessage) {

                noResultMessage.remove();

                noResultMessage = null;
            }
        }
    }

    /* ==========================
       EVENT LISTENERS
    ========================== */

    categoryFilter.addEventListener(
        "change",
        filterFoods
    );

    areaFilter.addEventListener(
        "change",
        filterFoods
    );

    searchInput.addEventListener(
        "keyup",
        filterFoods
    );

    /* ==========================
       LOAD MORE
    ========================== */

    const loadMoreBtn =
        document.querySelector(
            ".pagination-section .btn"
        );

    const cardsPerPage = 6;

    let currentVisible =
        cardsPerPage;

    function initializeCards() {

        foodCards.forEach((card, index) => {

            if (index < currentVisible) {

                card.style.display = "block";

            } else {

                card.style.display = "none";
            }

        });

        if (
            foodCards.length <= cardsPerPage
        ) {

            loadMoreBtn.style.display =
                "none";
        }
    }

    initializeCards();

    loadMoreBtn.addEventListener(
        "click",
        () => {

            currentVisible += cardsPerPage;

            foodCards.forEach(
                (card, index) => {

                    if (
                        index < currentVisible
                    ) {

                        card.style.display =
                            "block";
                    }

                }
            );

            if (
                currentVisible >=
                foodCards.length
            ) {

                loadMoreBtn.innerText =
                    "All Foods Loaded";

                loadMoreBtn.disabled =
                    true;
            }

        }
    );

    /* ==========================
       GSAP ANIMATIONS
    ========================== */

    if (typeof gsap !== "undefined") {

        gsap.from(".food-card", {

            opacity: 0,

            y: 50,

            duration: 1,

            stagger: 0.15,

            ease: "power3.out"

        });

    }

    /* ==========================
       HERO ANIMATION
    ========================== */

    if (typeof gsap !== "undefined") {

        gsap.from(".hero-title", {

            y: 50,

            opacity: 0,

            duration: 1

        });

        gsap.from(".hero-description", {

            y: 30,

            opacity: 0,

            duration: 1,

            delay: 0.3

        });

        gsap.from(".hero-buttons", {

            y: 30,

            opacity: 0,

            duration: 1,

            delay: 0.6

        });

        gsap.from(".food-card", 
            {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                clearProps: "all"
            });

    }

    /* ==========================
       AOS INIT
    ========================== */

    if (typeof AOS !== "undefined") {

        AOS.init({

            duration: 1000,

            once: true
        });

    }

});