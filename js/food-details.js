/* ==========================================
   FOOD DETAILS
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    async () =>
{
    const params =
        new URLSearchParams(
            window.location.search
        );

    const foodId =
        parseInt(
            params.get("id")
        );

    if(!foodId)
    {
        showError();
        return;
    }

    try
    {
        const response =
            await fetch(
                "data/foods.json"
            );

        const data =
            await response.json();

        const food =
            data.foods.find(
                item =>
                    item.id === foodId
            );

        if(!food)
        {
            showError();
            return;
        }

        renderFoodDetails(
            food
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

function renderFoodDetails(
    food
)
{
    document.title =
        `${food.name} | Ama Asmita`;

    const container =
        document.getElementById(
            "foodDetails"
        );

    container.innerHTML = `

        <img
            src="${food.image}"
            alt="${food.name}"
            class="hero-image mb-4"
        >

        <div class="details-card">

            <span class="category-badge">

                ${food.category}

            </span>

            <br><br>

            <h1 class="details-title">

                ${food.name}

            </h1>

            <div class="details-meta">

                <span>

                    <i class="bi bi-geo-alt-fill"></i>

                    ${food.location || "Odisha"}

                </span>

                <span>

                    <i class="bi bi-tag-fill"></i>

                    ${food.category}

                </span>

            </div>

            <p class="details-description">

                ${food.description}

            </p>

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
                    src="${food.contributor.image}"
                    alt="${food.contributor.name}"
                >

                <div>

                    <h5>

                        ${food.contributor.name}

                    </h5>

                    <p class="mb-2">

                        Contributor

                    </p>

                    <div class="social-links">

                        <a
                            href="${food.contributor.facebook}"
                            target="_blank"
                        >
                            <i class="fab fa-facebook"></i>
                        </a>

                        <a
                            href="${food.contributor.instagram}"
                            target="_blank"
                        >
                            <i class="fab fa-instagram"></i>
                        </a>

                        <a
                            href="${food.contributor.linkedin}"
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
                Food Not Found
            </h1>

            <p>
                The requested food item
                does not exist.
            </p>

            <a
                href="foods.html"
                class="btn btn-warning mt-3"
            >
                Back To Foods
            </a>

        </div>

    `;
}