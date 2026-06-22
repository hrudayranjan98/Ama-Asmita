/* ==========================================
TOURIST.JS
Ama Asmita
========================================== */

document.addEventListener("DOMContentLoaded", () => {


const districtFilter =
    document.getElementById("districtFilter");

const categoryFilter =
    document.getElementById("categoryFilter");

const searchInput =
    document.getElementById("searchInput");

const touristContainer =
    document.getElementById("touristContainer");

const loadMoreBtn =
    document.querySelector(".pagination-section .btn");

const JSON_PATH =
    "data/tourist.json";

let touristData = [];
let currentVisible = 6;
let noResultMessage = null;

/* ==========================
   LOAD JSON
========================== */

async function loadTouristSpots() {

    try {

        const response =
            await fetch(JSON_PATH);

        console.log(response);

        const data =
            await response.json();

        console.log(data);

        touristData =
            data.spots;

        populateDistricts(data.districts);
        populateCategories(data.categories);
        renderCards(touristData);

    } catch (error) {

        console.error(error);
    }
}
/* ==========================
   POPULATE DISTRICTS
========================== */

function populateDistricts(
    districts
) {

    if (!districtFilter) return;

    districtFilter.innerHTML = `
        <option value="">
            All Districts
        </option>
    `;

    districts.forEach(
        district => {

            districtFilter.insertAdjacentHTML(
                "beforeend",
                `
                <option value="${district}">
                    ${district}
                </option>
                `
            );
        }
    );
}

/* ==========================
   POPULATE CATEGORIES
========================== */

function populateCategories(
    categories
) {

    if (!categoryFilter) return;

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

    touristContainer.innerHTML = "";

    data.forEach(spot => {

        const card = `

        <div
            class="col-lg-6 tourist-card-item"
            data-district="${spot.district.toLowerCase()}"
            data-category="${spot.category.toLowerCase()}"
        >

            <div class="tourist-card">

                <div class="tourist-image">

                    <img
                        src="${spot.image}"
                        alt="${spot.name}"
                    >

                </div>

                <div class="tourist-content">

                    <h2>
                        ${spot.name}
                    </h2>

                    <div class="spot-subtitle">

                        <span class="spot-location ${getLocationColor(spot.category)}">
                            <i class="fas ${getLocationIcon(spot.category)}"></i>
                                ${spot.location}
                        </span>

                        <a
                            href="${spot.mapLink}"
                            target="_blank"
                            class="map-btn"
                        >

                            <i class="fa-solid fa-location-dot"></i>

                            Google Map

                        </a>

                    </div>

                    <div class="spot-description">

                        <p>
                            ${spot.description}
                        </p>

                    </div>

                    <div class="contributor">

                        <div class="contributor-info">

                            <img
                                src="${spot.contributor.image}"
                                alt="${spot.contributor.name}"
                            >

                            <div>

                                <h6>
                                    ${spot.contributor.name}
                                </h6>

                                <small>
                                    ${spot.contributor.designation}
                                </small>

                            </div>

                        </div>

                        <div class="contributor-social">

                            <a href="${spot.contributor.facebook}" target="_blank">
                                <i class="fab fa-facebook"></i>
                            </a>

                            <a href="${spot.contributor.instagram}" target="_blank">
                                <i class="fab fa-instagram"></i>
                            </a>

                            <a href="${spot.contributor.linkedin}" target="_blank">
                                <i class="fab fa-linkedin"></i>
                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </div>

        `;

        touristContainer.insertAdjacentHTML(
            "beforeend",
            card
        );

    });

    initializeCards();
    animateCards();

    function getLocationIcon(category) 
    {

        const icons = {
            heritage: "fa-landmark",
            religious: "fa-gopuram",
            hill: "fa-mountain",
            waterfall: "fa-water",
            wildlife: "fa-paw",
            coastal: "fa-water",
            adventure: "fa-hiking",
            entertainment: "fa-ticket",
            museum: "fa-building-columns",
            ecotourism: "fa-tree"
        };

        return icons[category] || "fa-location-dot";
    }

    function getLocationColor(category) 
    {

        switch (category.trim().toLowerCase())
        {

            case "heritage":
                return "heritage-icon";

            case "religious":
                return "religious-icon";

            case "hill":
                return "hill-icon";

            case "waterfall":
                return "waterfall-icon";

            case "wildlife":
                return "wildlife-icon";

            case "coastal":
                return "coastal-icon";

            case "entertainment":
                return "entertainment-icon";

            case "museum":
                return "museum-icon";

            case "ecotourism":
                return "ecotourism-icon";

            case "adventure":
                return "adventure-icon";

            default:
                return "default-icon";
        }
    }
}

/* ==========================
   FILTER
========================== */

function filterTouristSpots() {

    const selectedDistrict =
        districtFilter.value.toLowerCase();

    const selectedCategory =
        categoryFilter.value.toLowerCase();

    const searchText =
        searchInput.value.toLowerCase();

    const cards =
        document.querySelectorAll(
            ".tourist-card-item"
        );

    let visibleCards = 0;

    cards.forEach(card => {

        const district =
            card.dataset.district;

        const category =
            card.dataset.category;

        const title =
            card.querySelector("h2")
            .innerText
            .toLowerCase();

        const districtMatch =
            selectedDistrict === "" ||
            district === selectedDistrict;

        const categoryMatch =
            selectedCategory === "all" ||
            category === selectedCategory;

        const searchMatch =
            title.includes(searchText);

        if (
            districtMatch &&
            categoryMatch &&
            searchMatch
        ) {

            card.style.display = "block";
            visibleCards++;

        } else {

            card.style.display = "none";
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
                <i class="fas fa-map-location-dot fa-3x mb-3"></i>
                <h3>No Tourist Spot Found</h3>
                <p>
                    Try changing district,
                    category or search keyword.
                </p>
            `;

            touristContainer.appendChild(
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
   LOAD MORE
========================== */

function initializeCards() {

    const cards =
        document.querySelectorAll(
            ".tourist-card-item"
        );

    cards.forEach(
        (card, index) => {

            card.style.display =
                index < currentVisible
                    ? "block"
                    : "none";
        }
    );

    if (
        cards.length <= currentVisible
    ) {

        loadMoreBtn.style.display =
            "none";
    }
}

loadMoreBtn?.addEventListener(
    "click",
    () => {

        currentVisible += 6;

        const cards =
            document.querySelectorAll(
                ".tourist-card-item"
            );

        cards.forEach(
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
            cards.length
        ) {

            loadMoreBtn.innerText =
                "All Places Loaded";

            loadMoreBtn.disabled =
                true;
        }

    }
);

/* ==========================
   EVENTS
========================== */

districtFilter?.addEventListener(
    "change",
    filterTouristSpots
);

categoryFilter?.addEventListener(
    "change",
    filterTouristSpots
);

searchInput?.addEventListener(
    "keyup",
    filterTouristSpots
);

/* ==========================
   ANIMATION
========================== */

function animateCards() {

    if (
        typeof gsap !==
        "undefined"
    ) {

        gsap.from(
            ".tourist-card-item",
            {
                y: 50,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out"
            }
        );
    }
}

/* ==========================
   AOS
========================== */

if (
    typeof AOS !==
    "undefined"
) {

    AOS.init({
        duration: 1000,
        once: true
    });
}

/* ==========================
   FACT ROTATOR
========================== */

const touristFacts = [

    "Odisha is home to the UNESCO World Heritage Site, the magnificent Konark Sun Temple.",
    "Chilika Lake is Asia's largest brackish water lagoon.",
    "Jagannath Temple is one of the Char Dham pilgrimage sites.",
    "Daringbadi is known as the Kashmir of Odisha.",
    "Hirakud Dam is one of the world's longest earthen dams.",
    "Similipal is a UNESCO Biosphere Reserve."

];

const factText =
    document.getElementById(
        "touristFactText"
    );

if (factText) {

    let factIndex = 0;

    setInterval(() => {

        factIndex =
            (factIndex + 1) %
            touristFacts.length;

        factText.style.opacity =
            "0";

        setTimeout(() => {

            factText.textContent =
                touristFacts[
                    factIndex
                ];

            factText.style.opacity =
                "1";

        }, 300);

    }, 5000);
}

loadTouristSpots();
 

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
    }, 800);
});
