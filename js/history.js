/* ==========================================
   HISTORY.JS
   Ama Asmita
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const categoryFilter =
        document.getElementById("historyCategory");

    const searchInput =
        document.getElementById("historySearch");

    const placeFilter =
        document.getElementById("birthPlaceFilter");

    const historyContainer =
        document.getElementById("historyContainer");

    const JSON_PATH =
        "data/history.json";

    let historyData = [];
    let noResultMessage = null;

    /* ==========================
       LOAD JSON
    ========================== */

    async function loadHistoryData() {

        try {

            const response =
                await fetch(JSON_PATH);

            const data =
                await response.json();

            historyData =
                data.personalities;

            populateCategories(
                data.categories
            );

            renderCards(
                historyData
            );

        } catch (error) {

            console.error(
                "Error Loading History Data:",
                error
            );
        }
    }

    /* ==========================
       POPULATE CATEGORY
    ========================== */

    function populateCategories(
        categories
    ) {

        categoryFilter.innerHTML = `
            <option value="all">
                All Categories
            </option>
        `;

        categories.forEach(
            category => {

                categoryFilter.insertAdjacentHTML(
                    "beforeend",
                    `
                    <option value="${category}">
                        ${category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                    `
                );

            }
        );

    }

    /* ==========================
       RENDER CARDS
    ========================== */

    function renderCards(data) {

        historyContainer.innerHTML = "";

        data.forEach(person => {

            const card = `

            <div
                class="col-lg-6 history-card-item"
                data-category="${person.category.toLowerCase()}"
                data-place="${person.birthPlace.toLowerCase()}"
            >

                <div class="history-card">

                    <div class="history-image">

                        <img
                            src="${person.image}"
                            alt="${person.name}"
                        >

                    </div>

                    <div class="history-content">

                        <h2>
                            ${person.name}
                        </h2>

                        <div class="history-meta">

                            <span>
                                <i class="fas fa-calendar-alt"></i>
                                ${person.tenure}
                            </span>

                            <span>
                                <i class="fas fa-location-dot"></i>
                                ${person.birthPlace}
                            </span>

                            <span>
                                <i class="fas ${getCategoryIcon(person.category)}"></i>
                                ${person.category}
                            </span>

                        </div>

                        <p class="history-subtitle">
                            ${person.description}
                        </p>

                        <div class="history-actions">

                            <button
                                class="know-more-btn"
                                onclick="window.open('${person.wikiLink}','_blank')"
                            >

                                <span class="bulb-container">
                                    <i class="fas fa-lightbulb bulb"></i>
                                </span>

                                Know More

                            </button>

                        </div>

                        <div class="contributor">

                            <div class="contributor-info">

                                <img
                                    src="${person.contributor.image}"
                                    alt="${person.contributor.name}"
                                >

                                <div>

                                    <h6>
                                        ${person.contributor.name}
                                    </h6>

                                    <small>
                                        Contributor
                                    </small>

                                </div>

                            </div>

                            <div class="contributor-social">

                                <a href="${person.contributor.facebook}" target= "_blank">
                                    <i class="fab fa-facebook"></i>
                                </a>

                                <a href="${person.contributor.instagram}" target= "_blank">
                                    <i class="fab fa-instagram"></i>
                                </a>

                                <a href="${person.contributor.linkedin}" target= "_blank">
                                    <i class="fab fa-linkedin"></i>
                                </a>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            `;

            historyContainer.insertAdjacentHTML(
                "beforeend",
                card
            );

        });

        animateCards();
        initializeCards();

        function getCategoryIcon(category) {

    const icons = {

        "King":
            "fa-crown",

        "Freedom Fighter":
            "fa-shield-alt",

        "Politician":
            "fa-landmark",

        "Poet":
            "fa-feather-alt",

        "Writer":
            "fa-feather-alt",

        "Scholar":
            "fa-book-open",

        "Saint":
            "fa-praying-hands",

        "Social Reformer":
            "fa-people-group",

        "Revolutionary":
            "fa-fist-raised",

        "Cultural Icon":
            "fa-star"

    };

    return icons[category] ||
        "fa-user";
}


    }

    /* ==========================
       FILTER FUNCTION
    ========================== */

    function filterHistory() {

        const selectedCategory =
            categoryFilter.value.toLowerCase();

        const searchText =
            searchInput.value.toLowerCase();

        const placeText =
            placeFilter.value.toLowerCase();

        const cards =
            document.querySelectorAll(
                ".history-card-item"
            );

        let visibleCards = 0;

        cards.forEach(card => {

            const category =
                card.dataset.category;

            const place =
                card.dataset.place;

            const title =
                card.querySelector("h2")
                .innerText
                .toLowerCase();

            const categoryMatch =
                selectedCategory === "all" ||
                category === selectedCategory;

            const searchMatch =
                title.includes(searchText);

            const placeMatch =
                place.includes(placeText);

            if (
                categoryMatch &&
                searchMatch &&
                placeMatch
            ) {

                card.style.display =
                    "block";

                visibleCards++;

            } else {

                card.style.display =
                    "none";

            }

        });

        showNoResults(
            visibleCards
        );

    }

    /* ==========================
       NO RESULT
    ========================== */

    function showNoResults(count) {

        if (count === 0) {

            if (!noResultMessage) {

                noResultMessage =
                    document.createElement(
                        "div"
                    );

                noResultMessage.classList.add(
                    "no-results"
                );

                noResultMessage.innerHTML = `
                    <i class="fas fa-landmark fa-3x mb-3"></i>

                    <h3>
                        No Historical Record Found
                    </h3>

                    <p>
                        Try changing category,
                        birthplace or search keyword.
                    </p>
                `;

                historyContainer.appendChild(
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
       EVENTS
    ========================== */

    categoryFilter?.addEventListener(
        "change",
        filterHistory
    );

    searchInput?.addEventListener(
        "keyup",
        filterHistory
    );

    placeFilter?.addEventListener(
        "keyup",
        filterHistory
    );

    /* ==========================
       GSAP ANIMATION
    ========================== */

    function animateCards() {

        if (
            typeof gsap !==
            "undefined"
        ) {

            gsap.from(
                ".history-card-item",
                {
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out"
                }
            );

        }

    }

    /* ==========================
       HERO ANIMATION
    ========================== */

    if (
        typeof gsap !==
        "undefined"
    ) {

        gsap.from(
            ".hero-tag",
            {
                opacity: 0,
                y: -30,
                duration: 1
            }
        );

        gsap.from(
            ".hero-title",
            {
                opacity: 0,
                y: 50,
                duration: 1,
                delay: 0.2
            }
        );

        gsap.from(
            ".hero-description",
            {
                opacity: 0,
                y: 40,
                duration: 1,
                delay: 0.4
            }
        );

        gsap.from(
            ".btn-history",
            {
                y: 30,
                duration: 1,
                delay: 0.6
            }
        );

    }

    /* ==========================
       AOS INIT
    ========================== */

    if (
        typeof AOS !==
        "undefined"
    ) {

        AOS.init({

            duration: 1000,
            once: true,
            offset: 120

        });

    }

    loadHistoryData();

});

/* ==========================
   DID YOU KNOW FACTS
========================== */

const facts = [

    "Kharavela's Hathigumpha Inscription is one of the most important historical records of ancient India.",

    "Odisha became a separate state on 1 April 1936 based on linguistic identity.",

    "Konark Sun Temple was designed in the shape of a colossal chariot with 24 wheels.",

    "Madhusudan Das was the first Odia graduate and is known as Utkal Gourab.",

    "The ancient maritime traders of Kalinga sailed as far as Bali, Java and Sumatra.",

    "Bali Jatra commemorates Odisha's glorious maritime heritage.",

    "Jagannath Culture is one of the oldest living traditions in India.",

    "Kalinga was one of the most powerful kingdoms of ancient India."

];

let factIndex = 0;

setInterval(() => {

    const factText =
        document.getElementById(
            "factText"
        );

    if (!factText) return;

    factIndex =
        (factIndex + 1) %
        facts.length;

    factText.style.opacity =
        "0";

    setTimeout(() => {

        factText.textContent =
            facts[factIndex];

        factText.style.opacity =
            "1";

    }, 300);

}, 5000);
   

/* ==========================
   LOAD MORE
========================== */

const loadMoreBtn = 
    document.getElementById("loadMoreBtn");

const cardsPerPage = 10;

let currentVisible =
    cardsPerPage;

function initializeCards() {

    const cards =
        document.querySelectorAll(
            ".history-card-item"
        );

    cards.forEach(
        (card, index) => {

            card.style.display =
                index < currentVisible
                    ? "block"
                    : "none";

        }
    );

    if (loadMoreBtn) 
    {

        if (
            cards.length <=
            currentVisible
        ) {

            loadMoreBtn.style.display =
                "none";

        } else {

            loadMoreBtn.style.display =
                "inline-flex";
        }

    }

}

/* ==========================
   LOAD MORE CLICK
========================== */

loadMoreBtn?.addEventListener(
    "click",
    () => {

        currentVisible +=
            cardsPerPage;

        const cards =
            document.querySelectorAll(
                ".history-card-item"
            );

        cards.forEach(
            (card, index) => {

                if (
                    index <
                    currentVisible
                ) {

                    card.style.display =
                        "block";

                }

            }
        );

        if (
            currentVisible >=
            cards.length
        ) {

            loadMoreBtn.innerText =
                "All Legends Loaded";

            loadMoreBtn.disabled =
                true;

        }

    }
);

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
    }, 600);
});
