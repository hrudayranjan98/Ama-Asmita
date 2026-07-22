/* ==========================================
   HISTORY DETAILS
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    async () =>
{
    const params =
        new URLSearchParams(
            window.location.search
        );

    const legendId =
        parseInt(
            params.get("id")
        );

    if(!legendId)
    {
        showError();
        return;
    }

    try
    {
        const response =
            await fetch(
                "data/history.json"
            );

        const data =
            await response.json();

        const legend =
            data.personalities.find(
                item =>
                    item.id === legendId
            );

        if(!legend)
        {
            showError();
            return;
        }

        renderHistoryDetails(
            legend
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

function renderHistoryDetails(
    legend
)
{
    document.title =
        `${legend.name} | Ama Asmita`;

    const container =
        document.getElementById(
            "historyDetails"
        );

    container.innerHTML = `

        <img
            src="${legend.image}"
            alt="${legend.name}"
            class="hero-image mb-4"
        >

        <div class="details-card">

            <span class="category-badge">

                ${legend.category}

            </span>

            <br><br>

            <h1 class="details-title">

                ${legend.name}

            </h1>

            <div class="details-meta">

                <span>

                    <i class="bi bi-calendar-event-fill"></i>

                    ${legend.tenure}

                </span>

                <span>

                    <i class="bi bi-geo-alt-fill"></i>

                    ${legend.birthPlace}

                </span>

            </div>

            <p class="details-description">

                ${legend.description}

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
                    src="${legend.contributor.image}"
                    alt="${legend.contributor.name}"
                >

                <div>

                    <h5>

                        ${legend.contributor.name}

                    </h5>

                    <p class="mb-2">

                        Contributor

                    </p>

                    <div class="social-links">

                        <a
                            href="${legend.contributor.facebook}"
                            target="_blank"
                        >
                            <i class="fab fa-facebook"></i>
                        </a>

                        <a
                            href="${legend.contributor.instagram}"
                            target="_blank"
                        >
                            <i class="fab fa-instagram"></i>
                        </a>

                        <a
                            href="${legend.contributor.linkedin}"
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
                Legend Not Found
            </h1>

            <p>
                The requested legend
                does not exist.
            </p>

            <a
                href="history.html"
                class="btn btn-warning mt-3"
            >
                Back To Legends
            </a>

        </div>

    `;
}