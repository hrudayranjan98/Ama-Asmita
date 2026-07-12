/* ==========================================
   TOURIST DETAILS
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    async () =>
{

    const params =
        new URLSearchParams(
            window.location.search
        );

    const touristId =
        parseInt(
            params.get("id")
        );

    if(!touristId)
    {
        showError();
        return;
    }

    try
    {
        const response =
            await fetch(
                "data/tourist.json"
            );

        const data =
            await response.json();

        const spot =
            data.spots.find(
                item =>
                item.id === touristId
            );

        if(!spot)
        {
            showError();
            return;
        }

        renderTouristDetails(
            spot
        );

    }
    catch(error)
    {
        console.error(error);
        showError();
    }

});

/* ==========================================
   RENDER DETAILS
========================================== */

function renderTouristDetails(spot)
{
    document.title =
        `${spot.name} | Ama Asmita`;

    const container =
        document.getElementById(
            "touristDetails"
        );

    container.innerHTML = `

        <img
            src="${spot.image}"
            alt="${spot.name}"
            class="hero-image mb-4"
        >

        <div class="details-card">

            <span class="category-badge">

                ${capitalize(
                    spot.category
                )}

            </span> <br><br>

            <h1 class="details-title">

                ${spot.name}

            </h1>

            <div class="details-meta">

                <span>

                    <i class="bi bi-geo-alt-fill"></i>

                    ${spot.location}

                </span>

                <span>

                    <i class="bi bi-buildings-fill"></i>

                    ${spot.district}

                </span>

            </div>

            <p class="details-description">

                ${spot.description}

            </p>

            <a
                href="${spot.mapLink}"
                target="_blank"
                class="map-btn"
            >

                <i class="bi bi-map-fill"></i>

                Open In Google Maps

            </a>

        </div>

        <div class="contributor-card mt-4">

            <h3 class="mb-4">

                Contributor Details

            </h3>

            <div
                class="
                    d-flex
                    align-items-center
                    flex-wrap
                    gap-3
                "
            >

                <img
                    src="${spot.contributor.image}"
                    alt="${spot.contributor.name}"
                >

                <div>

                    <h5>

                        ${spot.contributor.name}

                    </h5>

                    <p class="mb-2">

                        ${spot.contributor.designation}

                    </p>

                    <div class="social-links">

                        <a
                            href="${spot.contributor.facebook}"
                            target="_blank"
                        >
                            <i class="fab fa-facebook"></i>
                        </a>

                        <a
                            href="${spot.contributor.instagram}"
                            target="_blank"
                        >
                            <i class="fab fa-instagram"></i>
                        </a>

                        <a
                            href="${spot.contributor.linkedin}"
                            target="_blank"
                        >
                            <i class="fab fa-linkedin"></i>
                        </a>

                    </div>

                </div>

            </div>

        </div>

    `;
}
/* ==========================================
   CAPITALIZE
========================================== */

function capitalize(text)
{
    return text
        .charAt(0)
        .toUpperCase()
        +
        text.slice(1);
}

/* ==========================================
   ERROR PAGE
========================================== */

function showError()
{
    document.body.innerHTML = `

        <div
            style="
                min-height:100vh;
                display:flex;
                align-items:center;
                justify-content:center;
                flex-direction:column;
                background:#0d1117;
                color:white;
                text-align:center;
                padding:20px;
            "
        >

            <i
                class="bi bi-exclamation-triangle-fill"
                style="
                    font-size:4rem;
                    color:#ffc107;
                "
            ></i>

            <h1 class="mt-3">
                Tourist Spot Not Found
            </h1>

            <p>
                The requested tourist
                spot does not exist.
            </p>

            <a
                href="tourist-spots.html"
                class="btn btn-primary mt-3"
            >
                Back To Tourist Spots
            </a>

        </div>

    `;
}