document.addEventListener("DOMContentLoaded", () => {

const categoryFilter =
document.getElementById("foodCategory");

const areaFilter =
document.getElementById("foodArea");

const searchInput =
document.getElementById("foodSearch");

const foodContainer =
document.getElementById("foodContainer");

const noResultsContainer =
document.getElementById("noResultsContainer");

const FOOD_JSON_PATH = "data/foods.json";

let foodData = [];
let noResultMessage = null;

/* ==========================
CATEGORY ICONS
========================== */

function getCategoryIcon(category) {

 
const icons = {

    "main course": "fa-bowl-rice",
    "breakfast": "fa-bread-slice",
    "sweet": "fa-cake-candles",
    "dessert": "fa-ice-cream",
    "street food": "fa-burger",
    "snack": "fa-cookie-bite",
    "beverage": "fa-mug-hot",
    "traditional beverage": "fa-glass-water",
    "seafood": "fa-fish",
    "festival special": "fa-star",
    "pitha": "fa-cheese",
    "temple food": "fa-gopuram",
    "side dish": "fa-utensils"

};

return icons[
    category.toLowerCase()
] || "fa-utensils";
 

}

function getCategoryClass(category) {

 
return category
    .toLowerCase()
    .replace(/\s+/g, "-");
 

}

/* ==========================
LOAD JSON
========================== */


function populateCategories(categories) {

    categoryFilter.innerHTML = `
        <option value="all">
            All Categories
        </option>
    `;

    categories.forEach(category => {

        categoryFilter.insertAdjacentHTML(
            "beforeend",
            `
            <option value="${category.toLowerCase()}">
                ${category}
            </option>
            `
        );
    });
}

function populateAreas(districts) {

    areaFilter.innerHTML = `
        <option value="">
            All Areas
        </option>
    `;

    districts.forEach(area => {

        areaFilter.insertAdjacentHTML(
            "beforeend",
            `
            <option value="${area.toLowerCase()}">
                ${area}
            </option>
            `
        );
    });
}

async function loadFoods() {

 
try {

    const response =
        await fetch(FOOD_JSON_PATH);

    if (!response.ok) {

        throw new Error(
            `HTTP Error: ${response.status}`
        );
    }

    const data =
        await response.json();

    foodData = data.foods;
    populateCategories(data.categories);

    /* Get unique districts from all foods */
    const uniqueDistricts = [
        ...new Set(
            foodData.flatMap(
                food => food.district
            )
        )
    ];

    populateAreas(uniqueDistricts);
    renderFoods(foodData);

} catch (error) {

    console.error(
        "Error loading foods:",
        error
    );

    foodContainer.innerHTML = `

        <div class="col-12 text-center">

            <h4>
                Unable to load food data.
            </h4>

        </div>

    `;
}
 

}

/* ==========================
RENDER CARDS
========================== */

function renderFoods(foods) {

 
foodContainer.innerHTML = "";

foods.forEach(food => {

    const contributor =
        food.contributor || {};

    const card = `
 

<div
    class="col-lg-6 food-card-item"
    data-category="${food.category.toLowerCase()}"
    data-area="${
    (Array.isArray(food.district)
        ? food.district
        : [food.district]
    )
    .map(d => d.toLowerCase())
    .join(',')
}">

 
<div class="food-card">

    <div class="food-image">

        <img
            src="${food.image}"
            alt="${food.name}">

    </div>

    <div class="food-content">

        <h2>
            ${food.name}
        </h2>

        <div class="food-meta">

            <span class="food-location">

                <i class="fas fa-location-dot"></i>

                ${food.location}

            </span>

            <span class="food-category ${getCategoryClass(food.category)}">

                <i class="fas ${getCategoryIcon(food.category)}"></i>

                ${food.category}

            </span>

        </div>

        <div class="food-description">

            <p>
                ${food.description}
            </p>

        </div>

        <div class="food-facts">

            <i class="fas fa-lightbulb"></i>

            <span>
                ${food.didYouKnow}
            </span>

        </div>

        <div class="food-extra">

            <span>
                <i class="fas fa-award"></i>
                ${food.speciality}
            </span>

            <span>
                <i class="fas fa-calendar-days"></i>
                ${food.bestSeason}
            </span>
        </div>

        <div class="food-actions">

            <button
                class="know-more-btn"
                onclick="window.open('${food.wikiLink}','_blank')">

                <span class="bulb-container">

                    <i class="fas fa-lightbulb bulb"></i>

                </span>

                Know More

            </button>

        </div>

        <div class="contributor">

            <div class="contributor-info">

                <img
                    src="${contributor.image || 'assets/images/user.jpg'}"
                    alt="${contributor.name || 'Contributor'}">

                <div>

                    <h6>

                        ${contributor.name || 'Ama Asmita Contributor'}

                    </h6>

                    <small>

                        ${contributor.designation || 'Contributor'}

                    </small>

                </div>

            </div>

            <div class="contributor-social">

                <a
                    href="${contributor.facebook}"
                    target="_blank">

                    <i class="fab fa-facebook"></i>

                </a>

                <a
                    href="${contributor.instagram}"
                    target="_blank">

                    <i class="fab fa-instagram"></i>

                </a>

                <a
                    href="${contributor.linkedin}"
                    target="_blank">

                    <i class="fab fa-linkedin"></i>

                </a>

            </div>

        </div>

    </div>

</div>
 

</div>

 
    `;

    foodContainer.insertAdjacentHTML(
        "beforeend",
        card
    );

});

animateCards();
initializeCards();
 

}

/* ==========================
FILTER
========================== */

function filterFoods() {

const selectedCategory =
    categoryFilter.value.toLowerCase();

const selectedArea =
    areaFilter.value.toLowerCase();

const searchText =
    searchInput.value.toLowerCase();

const cards =
    document.querySelectorAll(
        ".food-card-item"
    );

let visibleCards = 0;

cards.forEach(card => {

    const category =
        card.dataset.category;

    const area =
        card.dataset.area;

    const title =
        card.querySelector("h2")
            .innerText
            .toLowerCase();

    const categoryMatch =
        selectedCategory === "all" ||
        category === selectedCategory;

    const areaMatch =
        selectedArea === "" ||
        area.split(",").includes(selectedArea);

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

/* Hide Load More when filters are active */
if (
    selectedCategory !== "all" ||
    selectedArea !== "" ||
    searchText !== ""
) {

    card.style.display = "block";
            visibleCards++;

} else {

    initializeCards();
}

showNoResults(
    visibleCards
);

}


/* ==========================
NO RESULT
========================== */

function showNoResults(count) {

 
if (!noResultsContainer) return;

if (count === 0) {

    noResultsContainer.innerHTML = `

        <div class="no-results text-center py-5">

            <i class="fas fa-utensils fa-3x mb-3"></i>

            <h3>
                No Food Found
            </h3>

            <p>
                Try changing category,
                area or search keyword.
            </p>

        </div>

    `;

} else {

    noResultsContainer.innerHTML =
        "";
}
 

}

/* ==========================
EVENTS
========================== */

categoryFilter?.addEventListener(
"change",
filterFoods
);

areaFilter?.addEventListener(
"change",
filterFoods
);

searchInput?.addEventListener(
"keyup",
filterFoods
);

/* ==========================
GSAP
========================== */

function animateCards() {

 
if (
    typeof gsap !==
    "undefined"
) {

    gsap.from(
        ".food-card",
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
INIT
========================== */

loadFoods();

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
            "foodFactText"
        );

    if (!factText) return;

    factIndex =
        (factIndex + 1) %
        facts.length;

    foodFactText.style.opacity =
        "0";

    setTimeout(() => {

        foodFactText.textContent =
            facts[factIndex];

        foodFactText.style.opacity =
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
            ".food-card-item"
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
                ".food-card-item"
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

            loadMoreBtn.innerHTML = `
                <i class="fas fa-check-circle"></i>
                All Foods Loaded
            `;

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
    }, 200);
});