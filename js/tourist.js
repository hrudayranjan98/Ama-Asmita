/* ==========================================
TOURIST.JS
Ama Asmita
========================================== */

document.addEventListener("DOMContentLoaded", () => {

```
const districtFilter =
    document.getElementById("districtFilter");

const categoryFilter =
    document.getElementById("categoryFilter");

const searchInput =
    document.getElementById("searchInput");

const touristCards =
    document.querySelectorAll(".tourist-card-item");

const touristContainer =
    document.getElementById("touristContainer");

let noResultMessage = null;

/* ==========================
   FILTER FUNCTION
========================== */

function filterTouristSpots() {

    const selectedDistrict =
        districtFilter.value.toLowerCase();

    const selectedCategory =
        categoryFilter.value.toLowerCase();

    const searchText =
        searchInput.value.toLowerCase();

    let visibleCards = 0;

    touristCards.forEach(card => {

        const district =
            card.dataset.district.toLowerCase();

        const category =
            card.dataset.category.toLowerCase();

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

    showNoResults(visibleCards);

}

/* ==========================
   NO RESULT MESSAGE
========================== */

function showNoResults(count) {

```
if (count === 0) {

    if (!noResultMessage) {
        noResultMessage = document.createElement("div");

        noResultMessage.classList.add("no-results");

        noResultMessage.innerHTML = `
            <i class="fas fa-map-location-dot fa-3x mb-3"></i>
            <h3>No Tourist Spot Found</h3>
            <p>
                Try changing your district,
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
```

}


/* ==========================
   EVENT LISTENERS
========================== */

districtFilter.addEventListener(
    "change",
    filterTouristSpots
);

categoryFilter.addEventListener(
    "change",
    filterTouristSpots
);

searchInput.addEventListener(
    "keyup",
    filterTouristSpots
);

/* ==========================
   LOAD MORE BUTTON
========================== */

const cardsPerPage = 6;

const loadMoreBtn =
    document.querySelector(
        ".pagination-section .btn"
    );

let currentVisible =
    cardsPerPage;

function initializeCards() {

    touristCards.forEach((card, index) => {

        if (index < currentVisible) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }

    });

    if (
        touristCards.length <= cardsPerPage
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

        touristCards.forEach(
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
            touristCards.length
        ) {

            loadMoreBtn.innerText =
                "All Places Loaded";

            loadMoreBtn.disabled =
                true;
        }
    }
);

/* ==========================
   GSAP CARD ANIMATION
========================== */

if (typeof gsap !== "undefined") {

    gsap.from(".tourist-card", {

        opacity: 0,

        y: 50,

        duration: 1,

        stagger: 0.15,

        ease: "power3.out"

    });

}

/* ==========================
   FILTER ANIMATION
========================== */

const filterBox =
    document.querySelector(
        ".filter-box"
    );

if (
    filterBox &&
    typeof gsap !== "undefined"
) {

    gsap.from(filterBox, {

        y: -40,

        opacity: 0,

        duration: 1

    });

}

/* ==========================
   SEARCH HIGHLIGHT
========================== */

searchInput.addEventListener(
    "focus",
    () => {

        searchInput.style.boxShadow =
            "0 0 15px rgba(255,107,53,.4)";
    }
);

searchInput.addEventListener(
    "blur",
    () => {

        searchInput.style.boxShadow =
            "none";
    }
);

/* ==========================
   AOS INIT
========================== */

if (typeof AOS !== "undefined") {

    AOS.init({

        duration: 1000,

        once: true
    });

}
```

});
