/* ==========================================
        CONTRIBUTION DETAILS.JS
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    async () =>
{
    const token =
        localStorage.getItem(
            "token"
        );

    if(!token)
    {
        window.location.href =
            "login.html";

        return;
    }

    const params =
        new URLSearchParams(
            window.location.search
        );

    const contributionId =
        params.get("id");

    if(!contributionId)
    {
        alert(
            "Contribution ID not found."
        );

        window.location.href =
            "dashboard.html";

        return;
    }

    await loadContributionDetails(
        contributionId
    );
});

/* ==========================================
        LOAD DETAILS
========================================== */

async function loadContributionDetails(
    contributionId
)
{
    try
    {
        const token =
            localStorage.getItem(
                "token"
            );

        const response =
            await fetch(
                `http://localhost:5128/api/contribution/${contributionId}`,
                {
                    headers:
                    {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        if(!response.ok)
        {
            throw new Error(
                "Failed to load contribution."
            );
        }

        const data =
            await response.json();

        console.log(
            "Contribution Details:",
            data
        );

        /* ==========================
           BASIC DETAILS
        ========================== */

        document.getElementById(
            "title"
        ).textContent =
            data.title || "-";

        document.getElementById(
            "category"
        ).textContent =
            data.category || "-";

        document.getElementById(
            "district"
        ).textContent =
            data.contributorAddress || "-";

        document.getElementById(
            "location"
        ).textContent =
            data.googleMapLink || "-";

        document.getElementById(
            "description"
        ).textContent =
            data.article || "-";

        document.getElementById(
            "submittedOn"
        ).textContent =
            new Date(
                data.submittedOn
            ).toLocaleDateString();

        document.getElementById(
            "status"
        ).textContent =
            data.status || "-";

        /* ==========================
           CONTRIBUTOR DETAILS
        ========================== */

        document.getElementById(
            "contributorName"
        ).textContent =
            data.fullName || "-";


        /* ==========================
           SOCIAL LINKS
        ========================== */

        setupSocialLink(
            "facebookLink",
            data.facebookLink
        );

        setupSocialLink(
            "instagramLink",
            data.instagramLink
        );

        setupSocialLink(
            "linkedinLink",
            data.linkedInLink
        );

        
        /* ==========================
           WITHDRAW BUTTON
        ========================== */

        const withdrawBtn =
            document.getElementById(
                "withdrawBtn"
            );

        if(
            data.status === "Approved" ||
            data.status === "Rejected"
        )
        {
            withdrawBtn.disabled = true;

            withdrawBtn.innerHTML =
                `<i class="bi bi-lock-fill me-2"></i>
                Cannot Withdraw`;

            withdrawBtn.title =
                "Approved or Rejected contributions cannot be withdrawn";

            withdrawBtn.style.opacity =
                "0.6";

            withdrawBtn.style.cursor =
                "not-allowed";
        }

        }
        catch(error)
        {
            console.error(
                error
            );

            alert(
                "Unable to load contribution."
            );
        }
}

/* ==========================================
        SOCIAL LINKS
========================================== */

function setupSocialLink(
    elementId,
    url
)
{
    const element =
        document.getElementById(
            elementId
        );

    if(url)
    {
        element.href = url;

        let platform = "";

        if(elementId === "facebookLink")
        {
            platform = "Facebook";
        }
        else if(elementId === "instagramLink")
        {
            platform = "Instagram";
        }
        else if(elementId === "linkedinLink")
        {
            platform = "LinkedIn";
        }

        const icon =
            element.querySelector("i").outerHTML;

        let username =
            url
                .replace(/^https?:\/\//, "")
                .replace(/^www\./, "")
                .split("/")
                .pop();

        if(!username)
        {
            username = url;
        }

        element.innerHTML = `
            ${icon}
            <span class="social-platform">
                ${platform}
            </span>
            <span class="social-username">
                ${username}
            </span>
        `;
    }
    else
    {
        element.style.display = "none";
    }
}

/* ==========================================
        WITHDRAW CONTRIBUTION
========================================== */

async function withdrawContribution(
    id
)
{
    const confirmDelete =
        confirm(
            "Do you want to withdraw this contribution?"
        );

    if(!confirmDelete)
    {
        return;
    }

    try
    {
        const token =
            localStorage.getItem(
                "token"
            );

        const response =
            await fetch(
                `http://localhost:5128/api/contribution/${id}`,
                {
                    method:
                        "DELETE",

                    headers:
                    {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        if(response.ok)
        {
            alert(
                "Contribution withdrawn successfully."
            );

            window.location.href =
                "dashboard.html";
        }
        else
        {
            alert(
                "Failed to withdraw contribution."
            );
        }
    }
    catch(error)
    {
        console.error(
            error
        );

        alert(
            "Something went wrong."
        );
    }
}

/* ==========================================
PAGE LOADER
========================================== */

window.addEventListener(
    "load",
    () =>
    {
        const loader =
            document.getElementById(
                "page-loader"
            );

        setTimeout(
            () =>
            {
                loader?.classList.add(
                    "hide"
                );
            },
            200
        );
    }
);



/* ==========================================
WITHDRAW MODAL
========================================== */

const withdrawBtn =
    document.getElementById(
        "withdrawBtn"
    );

const confirmModal =
    document.getElementById(
        "confirmModal"
    );

const modalConfirmBtn =
    document.getElementById(
        "modalConfirmBtn"
    );

const modalCancelBtn =
    document.getElementById(
        "modalCancelBtn"
    );

let contributionId =
    new URLSearchParams(
        window.location.search
    ).get("id");

/* OPEN MODAL */

withdrawBtn?.addEventListener(
    "click",
    () =>
    {
        confirmModal.classList.add(
            "show"
        );
    }
);

/* CLOSE MODAL */

modalCancelBtn?.addEventListener(
    "click",
    () =>
    {
        confirmModal.classList.remove(
            "show"
        );
    }
);

/* CLICK OUTSIDE */

confirmModal?.addEventListener(
    "click",
    (e) =>
    {
        if(
            e.target === confirmModal
        )
        {
            confirmModal.classList.remove(
                "show"
            );
        }
    }
);


document.addEventListener(
    "DOMContentLoaded",
    () =>
    {
        const withdrawBtn =
            document.getElementById("withdrawBtn");

        const confirmModal =
            document.getElementById("confirmModal");

        const modalConfirmBtn =
            document.getElementById("modalConfirmBtn");

        const modalCancelBtn =
            document.getElementById("modalCancelBtn");

        /* CONFIRM WITHDRAW */

        modalConfirmBtn?.addEventListener(
            "click",
            async () =>
            {
                const token =
                    localStorage.getItem(
                        "token"
                    );

                if(!token)
                {
                    alert(
                        "Please login first."
                    );

                    return;
                }

                try
                {
                    modalConfirmBtn.disabled = true;

                    modalConfirmBtn.innerHTML = `
                        <span class="spinner-border spinner-border-sm me-2"></span>
                        Withdrawing...
                    `;

                    const response =
                        await fetch(
                            `http://localhost:5128/api/contribution/${contributionId}`,
                            {
                                method: "DELETE",

                                headers:
                                {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        );

                    if(response.ok)
                    {
                        modalConfirmBtn.innerHTML = `
                            <i class="bi bi-check-circle-fill me-2"></i>
                            Withdrawn
                        `;

                        setTimeout(() =>
                        {
                            window.location.href =
                                "dashboard.html";
                        }, 1000);
                    }
                    else
                    {
                        alert(
                            "Failed to withdraw contribution."
                        );

                        modalConfirmBtn.disabled = false;

                        modalConfirmBtn.innerHTML =
                            "Yes, Withdraw";
                    }
                }
                catch(error)
                {
                    console.error(error);

                    alert(
                        "Something went wrong."
                    );

                    modalConfirmBtn.disabled = false;

                    modalConfirmBtn.innerHTML =
                        "Yes, Withdraw";
                }
            }
        );
    }
);

